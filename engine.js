// ─── Smart Interview Simulator — Engine ───

let state = {
  resume:'',github:'',domain:'',skills:{},
  questions:[],currentQ:0,totalQ:10,
  history:[],scores:[],adaptiveDiff:'medium',
  usedQuestions:[],selectedMcq:-1
};

function simulateDelay(ms){return new Promise(r=>setTimeout(r,ms||(400+Math.random()*600)));}

// ─── Resume Analysis ───
function analyzeResume(text){
  text=text.toLowerCase();
  const skills={};
  for(const[skill,keywords]of Object.entries(SKILL_DETECTION)){
    let m=0;for(const kw of keywords)if(text.includes(kw))m++;
    if(m>0){
      const hasStrong=new RegExp(`(strong|advanced|expert|proficient).{0,30}${keywords[0]}|${keywords[0]}.{0,30}(strong|advanced|expert|proficient)`,'i').test(text);
      const hasWeak=new RegExp(`(basic|beginner|learning|familiar|intro).{0,30}${keywords[0]}|${keywords[0]}.{0,30}(basic|beginner|learning|familiar|intro)`,'i').test(text);
      if(hasStrong||m>=3)skills[skill]='strong';
      else if(hasWeak||m===1)skills[skill]='weak';
      else skills[skill]='medium';
    }
  }
  if(Object.keys(skills).length<3){
    if(text.match(/student|b\.tech|btech|computer|engineering/)){
      if(!skills['dsa'])skills['dsa']='weak';
      if(!skills['git'])skills['git']='weak';
    }
  }
  let domain='Full Stack',maxS=0;
  for(const d of DOMAIN_DETECTION){let s=0;for(const kw of d.keywords)if(text.includes(kw))s++;if(s>maxS){maxS=s;domain=d.domain;}}
  const sn=Object.keys(skills),st=Object.entries(skills).filter(([,v])=>v==='strong').map(([k])=>k),wk=Object.entries(skills).filter(([,v])=>v==='weak').map(([k])=>k);
  let summary=`${domain} profile with ${sn.length} detected skills. `;
  if(st.length)summary+=`Strong in ${st.join(', ')}. `;
  if(wk.length)summary+=`Areas to develop: ${wk.join(', ')}.`;
  else summary+=`Solid foundation — interview will test depth.`;
  return{domain,skills,summary};
}

// ─── Question Picker ───
function pickQuestion(skillsObj,difficulty,usedQs,prevTopics){
  const skillList=Object.keys(skillsObj);
  // Determine desired type mix: ~40% mcq, ~30% short, ~30% detailed
  const mcqCount=state.history.filter(h=>h.type==='mcq').length;
  const shortCount=state.history.filter(h=>h.type==='short').length;
  const detCount=state.history.filter(h=>h.type==='detailed').length;
  const total=mcqCount+shortCount+detCount||1;
  let preferType=null;
  if(mcqCount/total<0.35)preferType='mcq';
  else if(shortCount/total<0.25)preferType='short';
  else if(detCount/total<0.25)preferType='detailed';

  let candidates=[];
  const diffs=[difficulty];
  if(difficulty==='hard')diffs.push('medium','easy');
  else if(difficulty==='medium')diffs.push('easy','hard');
  else diffs.push('medium','hard');

  for(const q of QUESTION_BANK){
    if(usedQs.includes(q.q))continue;
    // Must match candidate skills or be general
    if(q.topic!=='general'&&!skillList.includes(q.topic))continue;
    const diffMatch=diffs.indexOf(q.difficulty);
    if(diffMatch===-1)continue;
    const recentlyAsked=prevTopics.slice(-2).includes(q.topic);
    let priority=(diffMatch===0?10:diffMatch===1?5:2);
    if(recentlyAsked)priority-=6;
    if(preferType&&q.type===preferType)priority+=5;
    candidates.push({...q,priority});
  }

  // Fallback: include questions from other topics
  if(candidates.length<3){
    for(const q of QUESTION_BANK){
      if(usedQs.includes(q.q)||candidates.find(c=>c.q===q.q))continue;
      if(diffs.includes(q.difficulty)){
        candidates.push({...q,priority:0});
      }
    }
  }

  if(!candidates.length)return{topic:'general',type:'short',difficulty,q:"Tell me about a technical challenge you faced and how you solved it.",expected_keywords:["challenge","solution","approach","technology"],kw:["challenge","solution","approach","technology"]};

  candidates.sort((a,b)=>b.priority-a.priority);
  const topN=candidates.slice(0,Math.min(6,candidates.length));
  return topN[Math.floor(Math.random()*topN.length)];
}

// ─── Answer Evaluation ───
function evaluateAnswer(answer,q){
  if(q.type==='mcq')return evaluateMCQ(answer,q);
  return evaluateText(answer,q);
}

function evaluateMCQ(selectedIdx,q){
  const correct=selectedIdx===q.correct;
  const score=correct?100:0;
  const verdict=correct?'good':'poor';
  const feedback=correct?`Correct! "${q.options[q.correct]}" is the right answer.`:`Incorrect. The correct answer is "${q.options[q.correct]}".`;
  return{score,verdict,feedback,keywords_hit:correct?['correct']:[]};
}

function evaluateText(answer,q){
  const kws=q.kw||q.expected_keywords||[];
  const al=answer.toLowerCase();
  const words=al.split(/\s+/);
  const len=words.length;
  const hits=[];for(const k of kws)if(al.includes(k.toLowerCase()))hits.push(k);
  const ratio=hits.length/Math.max(kws.length,1);

  let score=0;
  // Keyword coverage
  score+=ratio*50;
  // Length
  if(q.type==='short'){
    if(len>20)score+=20;else if(len>10)score+=15;else if(len>5)score+=8;else score+=3;
  }else{
    if(len>80)score+=20;else if(len>50)score+=16;else if(len>30)score+=12;else if(len>15)score+=8;else score+=3;
  }
  // Sentences
  const sents=answer.split(/[.!?]+/).filter(s=>s.trim().length>5);
  if(q.type==='short'){
    score+=(sents.length>=2)?12:(sents.length>=1)?8:3;
  }else{
    if(sents.length>=4)score+=15;else if(sents.length>=3)score+=12;else if(sents.length>=2)score+=8;else score+=3;
  }
  // Depth
  const hasEx=/for example|e\.g\.|such as|like |instance/i.test(answer);
  const hasCd=/\(|\)|=>|function|def |class |import |return |print|{|}/i.test(answer);
  const hasSp=/O\(|complexity|algorithm|function|method|variable|object|array/i.test(answer);
  let dep=0;if(hasEx)dep+=5;if(hasCd)dep+=5;if(hasSp)dep+=5;
  score+=Math.min(15,dep);
  if(q.difficulty==='hard'&&ratio<0.3)score*=0.85;
  if(q.difficulty==='easy'&&ratio>0.5)score*=1.05;
  score=Math.round(Math.min(100,Math.max(5,score)));

  const missed=kws.filter(k=>!hits.includes(k)).slice(0,3);
  let verdict,feedback;
  if(score>=80){verdict='good';feedback=`Excellent! You covered ${hits.slice(0,3).join(', ')}. ${missed.length?'Could also mention '+missed.slice(0,2).join(' and ')+'.':'Very thorough!'}`;}
  else if(score>=50){verdict='ok';feedback=`Decent. You mentioned ${hits.length?hits.slice(0,2).join(', '):'some relevant points'}. Missing: ${missed.join(', ')}. Be more specific with examples.`;}
  else{verdict='poor';feedback=`Needs improvement. ${hits.length?'You touched on '+hits.join(', ')+', but ':''}Missing key concepts: ${missed.join(', ')}. Study this topic more.`;}
  return{score,verdict,feedback,keywords_hit:hits};
}

// ─── Feedback Generation ───
function generateFinalFeedback(hist,skills){
  const strengths=[],weaknesses=[],recommendations=[];
  const ts={};for(const h of hist){if(!ts[h.topic])ts[h.topic]=[];ts[h.topic].push(h.score);}
  for(const[t,sc]of Object.entries(ts)){const avg=sc.reduce((a,b)=>a+b,0)/sc.length;
    if(avg>=70)strengths.push({skill:t,reason:`Scored ${Math.round(avg)}% avg — solid understanding.`});
    else if(avg<50)weaknesses.push({skill:t,reason:`Scored ${Math.round(avg)}% avg — needs deeper study.`});
  }
  if(!strengths.length){const b=hist.reduce((a,c)=>a.score>c.score?a:c,hist[0]);if(b)strengths.push({skill:b.topic,reason:`Best score: ${b.score}%. Shows some foundation.`});}
  if(!weaknesses.length){const w=hist.reduce((a,c)=>a.score<c.score?a:c,hist[0]);if(w&&w.score<80)weaknesses.push({skill:w.topic,reason:`Lowest score: ${w.score}%. Room for growth.`});}
  const avg=hist.reduce((a,b)=>a+b.score,0)/hist.length;
  if(avg<50)recommendations.push({action:"Focus on fundamentals with structured courses",impact:"Strong foundation improves all subsequent learning."});
  for(const w of weaknesses.slice(0,2))recommendations.push({action:`Deep-dive into ${w.skill} with hands-on projects`,impact:`Builds real understanding and interview confidence.`});
  recommendations.push({action:"Practice mock interviews weekly",impact:"Improves articulation and reduces interview anxiety."});
  if(avg<70)recommendations.push({action:"Build portfolio projects showcasing your skills",impact:"Concrete evidence of ability for employers."});
  if(recommendations.length<3)recommendations.push({action:"Contribute to open-source projects",impact:"Real collaboration experience valued by employers."});

  // Type breakdown
  const mcqAvg=hist.filter(h=>h.type==='mcq');
  const shortAvg=hist.filter(h=>h.type==='short');
  const detAvg=hist.filter(h=>h.type==='detailed');
  let typeInsight='';
  if(mcqAvg.length){const a=Math.round(mcqAvg.reduce((s,h)=>s+h.score,0)/mcqAvg.length);typeInsight+=`MCQ: ${a}% avg. `;}
  if(shortAvg.length){const a=Math.round(shortAvg.reduce((s,h)=>s+h.score,0)/shortAvg.length);typeInsight+=`Short Answer: ${a}% avg. `;}
  if(detAvg.length){const a=Math.round(detAvg.reduce((s,h)=>s+h.score,0)/detAvg.length);typeInsight+=`Detailed: ${a}% avg.`;}
  if(typeInsight)recommendations.push({action:"Type Performance: "+typeInsight,impact:"Focus on weaker question types for improvement."});

  return{strengths:strengths.slice(0,3),weaknesses:weaknesses.slice(0,3),recommendations:recommendations.slice(0,5)};
}

// ─── UI Functions ───
function setStep(n){['s1','s2','s3','s4'].forEach((id,i)=>{const e=document.getElementById(id);if(i+1<n)e.className='step done';else if(i+1===n)e.className='step active';else e.className='step';});}

async function analyzeProfile(){
  const resume=document.getElementById('resume').value.trim();
  if(!resume||resume.length<30){alert('Please enter more details about your background.');return;}
  state.resume=resume;state.github=document.getElementById('github').value.trim();
  state.totalQ=parseInt(document.getElementById('qcount').value);
  document.getElementById('view-profile').style.display='none';
  document.getElementById('view-analysis').style.display='block';setStep(2);
  try{
    await simulateDelay(1000);
    const p=analyzeResume(resume);state.domain=p.domain;state.skills=p.skills;
    document.getElementById('analysis-loading').style.display='none';
    document.getElementById('analysis-result').style.display='block';
    document.getElementById('analysis-actions').style.display='flex';
    document.getElementById('domain-display').textContent=p.domain;
    document.getElementById('analysis-summary').textContent=p.summary;
    const map=document.getElementById('skill-map');map.innerHTML='';
    Object.entries(p.skills).forEach(([s,l])=>{
      const w={strong:'85%',medium:'55%',weak:'25%'},b={strong:'bar-strong',medium:'bar-medium',weak:'bar-weak'};
      map.innerHTML+=`<div class="skill-row"><span style="min-width:100px;font-size:12px;font-weight:600;text-transform:capitalize">${s}</span><div class="skill-bar-wrap"><div class="skill-bar ${b[l]||'bar-weak'}" style="width:${w[l]||'25%'}"></div></div><span class="chip ${l}" style="font-size:11px;padding:2px 8px">${l}</span></div>`;
    });
  }catch(e){document.getElementById('analysis-loading').innerHTML=`<div style="color:var(--danger);font-size:13px">Error: ${e.message}</div>`;}
}

function backToProfile(){
  document.getElementById('view-analysis').style.display='none';document.getElementById('view-profile').style.display='block';
  document.getElementById('analysis-loading').style.display='block';document.getElementById('analysis-result').style.display='none';
  document.getElementById('analysis-actions').style.display='none';setStep(1);
}

async function startInterview(){
  document.getElementById('view-analysis').style.display='none';document.getElementById('view-interview').style.display='block';setStep(3);
  document.getElementById('q-total').textContent=state.totalQ;
  state.questions=[];state.currentQ=0;state.history=[];state.scores=[];state.adaptiveDiff='medium';state.usedQuestions=[];
  updateProgress();await loadNextQuestion();
}

async function loadNextQuestion(){
  document.getElementById('question-text').textContent='Generating question...';
  document.getElementById('eval-box').style.display='none';
  document.getElementById('mcq-area').style.display='none';
  document.getElementById('answer-area').style.display='none';
  document.getElementById('q-actions').innerHTML='<button class="btn btn-primary" onclick="submitAnswer()">Submit Answer →</button>';
  document.getElementById('answer').value='';state.selectedMcq=-1;
  document.getElementById('q-num').textContent=state.currentQ+1;updateProgress();
  try{
    await simulateDelay(600);
    const prevTopics=state.history.map(h=>h.topic);
    const q=pickQuestion(state.skills,state.adaptiveDiff,state.usedQuestions,prevTopics);
    state.usedQuestions.push(q.q);state.questions.push(q);
    document.getElementById('question-text').textContent=q.q;
    // Type badge
    const tb=document.getElementById('type-badge');
    if(q.type==='mcq'){tb.textContent='MCQ';tb.className='type-badge type-mcq';}
    else if(q.type==='short'){tb.textContent='Short Answer (2 marks)';tb.className='type-badge type-short';}
    else{tb.textContent='Detailed';tb.className='type-badge type-detailed';}
    // Difficulty badge
    const db=document.getElementById('diff-badge');db.textContent=q.difficulty.charAt(0).toUpperCase()+q.difficulty.slice(1);db.className=`diff-badge diff-${q.difficulty}`;
    document.getElementById('topic-badge').textContent=q.topic;
    // Show appropriate input
    if(q.type==='mcq'){
      document.getElementById('mcq-area').style.display='block';
      document.getElementById('answer-area').style.display='none';
      const mc=document.getElementById('mcq-options');mc.innerHTML='';
      q.options.forEach((opt,i)=>{
        mc.innerHTML+=`<div class="mcq-option" id="mcq-${i}" onclick="selectMcq(${i})"><div class="mcq-radio"></div><span>${opt}</span></div>`;
      });
    }else{
      document.getElementById('mcq-area').style.display='none';
      document.getElementById('answer-area').style.display='block';
      const label=document.getElementById('answer-label');
      const ta=document.getElementById('answer');
      if(q.type==='short'){label.textContent='Your Answer (2 marks — keep it brief)';ta.placeholder='Write a concise answer in 2-3 sentences...';ta.style.minHeight='60px';}
      else{label.textContent='Your Answer (Explain in detail)';ta.placeholder='Type your detailed answer here with examples...';ta.style.minHeight='120px';}
    }
  }catch(e){document.getElementById('question-text').textContent='Error: '+e.message;}
}

function selectMcq(idx){
  document.querySelectorAll('.mcq-option').forEach(el=>el.classList.remove('selected'));
  document.getElementById('mcq-'+idx).classList.add('selected');
  state.selectedMcq=idx;
}

async function submitAnswer(){
  const q=state.questions[state.currentQ];
  let answer;
  if(q.type==='mcq'){
    if(state.selectedMcq===-1){alert('Please select an option.');return;}
    answer=state.selectedMcq;
  }else{
    answer=document.getElementById('answer').value.trim();
    if(!answer||answer.length<3){alert('Please write an answer.');return;}
  }
  document.getElementById('q-actions').style.display='none';
  document.getElementById('q-loading').style.display='block';
  if(q.type!=='mcq')document.getElementById('answer-area').style.display='none';

  try{
    await simulateDelay(q.type==='mcq'?400:800);
    const eval_=evaluateAnswer(answer,q);
    // Show MCQ correct/wrong highlights
    if(q.type==='mcq'){
      document.querySelectorAll('.mcq-option').forEach((el,i)=>{el.style.pointerEvents='none';if(i===q.correct)el.classList.add('correct');else if(i===state.selectedMcq&&i!==q.correct)el.classList.add('wrong');});
    }
    state.scores.push(eval_.score);
    state.history.push({q:q.q,score:eval_.score,topic:q.topic,diff:q.difficulty,type:q.type});
    // Adapt difficulty
    if(eval_.score>=75)state.adaptiveDiff=(q.difficulty==='easy'?'medium':q.difficulty==='medium'?'hard':'hard');
    else if(eval_.score>=45)state.adaptiveDiff=q.difficulty;
    else state.adaptiveDiff=(q.difficulty==='hard'?'medium':q.difficulty==='medium'?'easy':'easy');
    if(state.skills[q.topic]&&eval_.score<50)state.skills[q.topic]='weak';
    const avg=Math.round(state.scores.reduce((a,b)=>a+b,0)/state.scores.length);
    document.getElementById('running-score').textContent=avg+'%';
    // Eval display
    const eb=document.getElementById('eval-box');
    const cls=eval_.verdict==='good'?'eval-good':eval_.verdict==='ok'?'eval-ok':'eval-bad';
    const icon=eval_.verdict==='good'?'PASS':eval_.verdict==='ok'?'PARTIAL':'FAIL';
    const sc=eval_.score>=70?'score-high':eval_.score>=45?'score-mid':'score-low';
    eb.innerHTML=`<div class="evaluation ${cls}"><div class="eval-header">${icon} <span class="score-pill ${sc}">${eval_.score}/100</span></div><div class="eval-body">${eval_.feedback}</div></div>`;
    eb.style.display='block';
    addToTimeline(q,eval_.score);
    document.getElementById('q-loading').style.display='none';
    state.currentQ++;
    if(state.currentQ>=state.totalQ){document.getElementById('q-actions').innerHTML='<button class="btn btn-primary" onclick="showFeedback()">See Final Feedback →</button>';}
    else{document.getElementById('q-actions').innerHTML='<button class="btn btn-primary" onclick="loadNextQuestion()">Next Question →</button>';}
    document.getElementById('q-actions').style.display='flex';
  }catch(e){
    document.getElementById('q-loading').style.display='none';document.getElementById('q-actions').style.display='flex';
    document.getElementById('q-actions').innerHTML='<button class="btn btn-primary" onclick="submitAnswer()">Retry →</button>';alert('Error: '+e.message);
  }
}

function addToTimeline(q,score){
  const tl=document.getElementById('timeline');
  const cls=score>=70?'tl-pass':score>=45?'':'tl-fail';
  const status=score>=70?'PASS':score>=45?'OK':'FAIL';
  const typeLabel=q.type==='mcq'?'[MCQ]':q.type==='short'?'[Short]':'[Detailed]';
  tl.innerHTML+=`<div class="tl-item ${cls}"><strong>${q.topic}</strong> ${typeLabel} (${q.difficulty}) — ${status}: ${score}/100</div>`;
}

function toggleTimeline(){const t=document.getElementById('timeline');t.style.display=t.style.display==='none'?'block':'none';}
function updateProgress(){const p=state.totalQ>0?(state.currentQ/state.totalQ)*100:0;document.getElementById('q-progress').style.width=p+'%';}

async function showFeedback(){
  document.getElementById('view-interview').style.display='none';document.getElementById('view-feedback').style.display='block';setStep(4);
  const avg=Math.round(state.scores.reduce((a,b)=>a+b,0)/state.scores.length);
  document.getElementById('fb-score').textContent=avg+'%';document.getElementById('fb-domain').textContent=state.domain;
  const fb=generateFinalFeedback(state.history,state.skills);
  document.getElementById('fb-strengths').innerHTML=fb.strengths.map(s=>`<div class="strength-item"><div><strong>${s.skill}</strong> — ${s.reason}</div></div>`).join('');
  document.getElementById('fb-weaknesses').innerHTML=fb.weaknesses.map(w=>`<div class="weak-item"><div><strong>${w.skill}</strong> — ${w.reason}</div></div>`).join('');
  document.getElementById('fb-recommendations').innerHTML=fb.recommendations.map(r=>`<div class="rec-item"><div><strong>${r.action}</strong> — ${r.impact}</div></div>`).join('');
  const bk=document.getElementById('fb-breakdown');
  bk.innerHTML=state.history.map((h,i)=>{
    const cls=h.score>=70?'score-high':h.score>=45?'score-mid':'score-low';
    const ti=h.type==='mcq'?'MCQ':h.type==='short'?'Short':'Detailed';
    return`<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--border);font-size:13px;color:var(--text2)"><div><strong>Q${i+1}:</strong> ${h.topic} <span style="opacity:.6">(${h.diff})</span> <span style="font-size:11px;opacity:.5">${ti}</span></div><span class="score-pill ${cls}">${h.score}/100</span></div>`;
  }).join('');
}

function restartApp(){
  state={resume:'',github:'',domain:'',skills:{},questions:[],currentQ:0,totalQ:10,history:[],scores:[],adaptiveDiff:'medium',usedQuestions:[],selectedMcq:-1};
  document.getElementById('view-feedback').style.display='none';document.getElementById('view-profile').style.display='block';
  document.getElementById('resume').value='';document.getElementById('github').value='';
  document.getElementById('timeline').innerHTML='';document.getElementById('running-score').textContent='—';
  document.getElementById('analysis-loading').style.display='block';document.getElementById('analysis-result').style.display='none';
  document.getElementById('analysis-actions').style.display='none';document.getElementById('qcount').value=10;
  document.getElementById('qcount-val').textContent='10';setStep(1);
}
