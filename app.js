
// ── Constants ──────────────────────────────────────────────────────────────
const AY = '2025-2026';
const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const HOURS = Array.from({length:14},(_,i)=>i+8); // 0800–2100
const FACULTY_ZONES = {
  'COM – Computing': ['COM1','COM2','COM3','i3-Building','AS6'],
  'UTown – University Town': ['ERC','TH','Cinnamon College','Tembusu College','RC4'],
  'FOS – Science': ['S1A','S2','S3','S4','S5','S6','S7','S8','S11','S12','S13','S14','S15','S16','S17'],
  'ENG – Engineering': ['E1','E1A','E2','E3','E4','E4A','E5','E6','E7'],
  'BIOMED – Medicine/Health': ['MD1','MD2','MD3','MD4','MD6','MD7','Yong Siew Toh'],
  'BIZ – Business': ['BIZ1','BIZ2'],
  'FASS – Arts & Social': ['AS1','AS2','AS3','AS4','AS5','AS7','AS8'],
  'LAW – Law': ['Eu Tong Sen','Shaw Foundation Alumni','Moot Court'],
  'SCALE – Continuing Ed': ['SCALE','SDE-AR1','SDE-AR2'],
};

const MOCK_VENUE_SCHEDULE = {
  'COM1-0210':[
    {day:'Monday',   start:'0800',end:'1000',code:'CS1010',type:'Lecture'},
    {day:'Monday',   start:'1400',end:'1600',code:'CS2040',type:'Tutorial'},
    {day:'Wednesday',start:'0800',end:'1000',code:'CS1010',type:'Lecture'},
    {day:'Friday',   start:'1000',end:'1200',code:'IS1103',type:'Lecture'},
  ],
  'COM1-0201':[
    {day:'Tuesday',  start:'1000',end:'1200',code:'CS3230',type:'Lecture'},
    {day:'Thursday', start:'1400',end:'1600',code:'CS3230',type:'Tutorial'},
  ],
  'COM2-0115':[
    {day:'Monday',   start:'1200',end:'1400',code:'CS2103T',type:'Lecture'},
    {day:'Wednesday',start:'1400',end:'1600',code:'CS2103T',type:'Tutorial'},
    {day:'Friday',   start:'0800',end:'1000',code:'CS2105',type:'Lecture'},
  ],
  'COM2-0217':[
    {day:'Tuesday',  start:'0800',end:'1000',code:'CS2106',type:'Lecture'},
    {day:'Thursday', start:'1000',end:'1200',code:'CS2106',type:'Tutorial'},
  ],
  'S1A-0201':[
    {day:'Monday',   start:'1000',end:'1200',code:'MA1521',type:'Lecture'},
    {day:'Wednesday',start:'1000',end:'1200',code:'MA1521',type:'Lecture'},
    {day:'Friday',   start:'1400',end:'1600',code:'MA1521',type:'Tutorial'},
  ],
  'S2-B2-24':[
    {day:'Tuesday',  start:'1200',end:'1400',code:'ST1131',type:'Lecture'},
    {day:'Thursday', start:'0800',end:'1000',code:'ST1131',type:'Tutorial'},
  ],
  'S16-0314':[
    {day:'Monday',   start:'1400',end:'1600',code:'PC1221',type:'Lecture'},
    {day:'Friday',   start:'1000',end:'1200',code:'CM1121',type:'Lecture'},
  ],
  'LT27':[
    {day:'Monday',   start:'0800',end:'1000',code:'GEA1000',type:'Lecture'},
    {day:'Tuesday',  start:'1400',end:'1600',code:'GEA1000',type:'Lecture'},
    {day:'Thursday', start:'1200',end:'1400',code:'GEA1000',type:'Lecture'},
  ],
  'LT19':[
    {day:'Wednesday',start:'1000',end:'1200',code:'GEX1015',type:'Lecture'},
    {day:'Friday',   start:'1200',end:'1400',code:'HSS1000',type:'Lecture'},
  ],
  'E1-06-01':[
    {day:'Monday',   start:'1200',end:'1400',code:'EE2211',type:'Lecture'},
    {day:'Wednesday',start:'1400',end:'1600',code:'EE2211',type:'Tutorial'},
    {day:'Friday',   start:'0800',end:'1000',code:'EG2401A',type:'Lecture'},
  ],
  'E3-06-20':[
    {day:'Tuesday',  start:'0800',end:'1000',code:'ME3162',type:'Lecture'},
    {day:'Thursday', start:'1400',end:'1600',code:'ME3162',type:'Tutorial'},
  ],
  'BIZ1-0302':[
    {day:'Monday',   start:'1000',end:'1200',code:'MKT1003',type:'Lecture'},
    {day:'Wednesday',start:'1200',end:'1400',code:'FIN2004',type:'Lecture'},
    {day:'Friday',   start:'1400',end:'1600',code:'ACC1701',type:'Tutorial'},
  ],
  'AS5-0204':[
    {day:'Tuesday',  start:'1000',end:'1200',code:'EN1101E',type:'Lecture'},
    {day:'Thursday', start:'1000',end:'1200',code:'SC2207',type:'Lecture'},
  ],
  'ERC-HBL':[
    {day:'Monday',   start:'1800',end:'2000',code:'GET1036',type:'Lecture'},
    {day:'Wednesday',start:'1800',end:'2000',code:'GET1036',type:'Tutorial'},
  ],
  'TH-SR1':[],
  'TH-SR2':[{day:'Friday',start:'1400',end:'1600',code:'PL1101E',type:'Tutorial'}],
  'MD1-02-11':[
    {day:'Monday',   start:'0800',end:'1000',code:'LSM1301',type:'Lecture'},
    {day:'Wednesday',start:'1000',end:'1200',code:'LSM1301',type:'Tutorial'},
  ],
  'MD2-01-10':[],
  'SCALE-01':[{day:'Saturday',start:'0900',end:'1200',code:'BPS5201',type:'Lecture'}],
};

const MODULE_COLORS = [
  '#3b82f6','#8b5cf6','#ec4899','#f59e0b','#10b981',
  '#06b6d4','#f97316','#a3e635','#e11d48','#6366f1',
];

// ── Utility functions ───────────────────────────────────────────────────────
function timeToMinutes(t='0800'){
  return parseInt(t.slice(0,2))*60+parseInt(t.slice(2));
}
function minutesToTime(m){
  const h=Math.floor(m/60).toString().padStart(2,'0');
  const mm=(m%60).toString().padStart(2,'0');
  return `${h}${mm}`;
}
function formatTime(t='0800'){
  const h=parseInt(t.slice(0,2));
  const m=t.slice(2);
  const period=h>=12?'PM':'AM';
  const h12=h>12?h-12:h===0?12:h;
  return `${h12}:${m} ${period}`;
}
function getPeakRisk(slot){
  const start=timeToMinutes(slot.startTime||'0800');
  const PEAK_S=timeToMinutes('1200');
  const PEAK_E=timeToMinutes('1400');
  return start>=PEAK_S && start<PEAK_E;
}
function calcRisk(mod, lessons){
  if(!lessons||!lessons.length) return {level:'LOW',score:0,reasons:[]};
  const reasons=[];
  let score=0;
  const tutorials=lessons.filter(l=>l.lessonType&&l.lessonType.toLowerCase().includes('tutorial'));
  const hasPeakTut=tutorials.some(getPeakRisk);
  if(hasPeakTut){score+=40;reasons.push('Tutorial slot in peak congestion window (12–2 PM)');}
  const lectureSlots=lessons.filter(l=>l.lessonType&&l.lessonType.toLowerCase().includes('lecture'));
  const tutorialSlots=tutorials;
  for(const lec of lectureSlots){
    for(const tut of tutorialSlots){
      if(lec.day===tut.day){
        const ls=timeToMinutes(lec.startTime);
        const le=timeToMinutes(lec.endTime);
        const ts=timeToMinutes(tut.startTime);
        const te=timeToMinutes(tut.endTime);
        if(ls<te&&le>ts){score+=50;reasons.push(`Hidden clash: ${lec.lessonType} overlaps tutorial on ${lec.day}`);}
      }
    }
  }
  if(tutorials.length>2){score+=15;reasons.push('Multiple tutorial slots – high competition');}
  const level=score>=50?'HIGH':score>=20?'MEDIUM':'LOW';
  return {level,score,reasons};
}
function parseNUSModsURL(url){
  try{
    const u=new URL(url);
    if(!u.hostname.includes('nusmods'))return null;
    const codes=[];
    u.searchParams.forEach((_,k)=>{if(/^[A-Z]{2,3}\d{4}[A-Z]?$/.test(k))codes.push(k);});
    if(!codes.length){
      const path=u.pathname;
      const matches=path.match(/[A-Z]{2,3}\d{4}[A-Z]?/g);
      if(matches)codes.push(...matches);
    }
    return codes.length?[...new Set(codes)]:null;
  }catch{return null;}
}
function useLocalStorage(key,init){
  const [val,setVal]=React.useState(()=>{
    try{const s=localStorage.getItem(key);return s?JSON.parse(s):init;}
    catch{return init;}
  });
  const set=React.useCallback(v=>{
    setVal(v);
    try{localStorage.setItem(key,JSON.stringify(v));}catch{}
  },[key]);
  return [val,set];
}

// -- Toast Component --------------------------------------------------------
function Toast({toasts,remove}){
  return React.createElement('div',{className:'fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none'},
    toasts.map(t=>
      React.createElement('div',{key:t.id,className:`toast-enter pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium glass border ${
        t.type==='error'?'bg-red-950/90 border-red-500/40 text-red-200':
        t.type==='success'?'bg-emerald-950/90 border-emerald-500/40 text-emerald-200':
        'bg-brand-950/90 border-brand-500/40 text-brand-200'}`},
        React.createElement('span',null,t.type==='error'?'?':'?'),
        React.createElement('span',null,t.msg),
        React.createElement('button',{className:'ml-2 opacity-60 hover:opacity-100',onClick:()=>remove(t.id)},'?')
      )
    )
  );
}

function useToast(){
  const [toasts,setToasts]=React.useState([]);
  const add=React.useCallback((msg,type='info')=>{
    const id=Date.now();
    setToasts(p=>[...p,{id,msg,type}]);
    setTimeout(()=>setToasts(p=>p.filter(t=>t.id!==id)),4000);
  },[]);
  const remove=React.useCallback(id=>setToasts(p=>p.filter(t=>t.id!==id)),[]);
  return {toasts,add,remove};
}

// -- Risk Badge -------------------------------------------------------------
function RiskBadge({level}){
  const cfg={
    HIGH:{cls:'bg-red-500/20 text-red-300 border-red-500/40',icon:'??'},
    MEDIUM:{cls:'bg-amber-500/20 text-amber-300 border-amber-500/40',icon:'??'},
    LOW:{cls:'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',icon:'??'},
  }[level]||{cls:'',icon:''};
  return React.createElement('span',{className:`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.cls}`},
    cfg.icon,`${level} RISK`
  );
}

// -- Timetable Grid ---------------------------------------------------------
function TimetableGrid({modules}){
  const dark=document.documentElement.classList.contains('dark');
  const border=dark?'border-slate-700/50':'border-slate-200';
  const cellBg=dark?'bg-slate-900':'bg-white';
  const headerBg=dark?'bg-slate-800':'bg-slate-100';
  const allLessons=React.useMemo(()=>{
    const list=[];
    modules.forEach((m,mi)=>{
      if(!m.lessons)return;
      m.lessons.forEach(l=>{list.push({...l,code:m.code,color:MODULE_COLORS[mi%MODULE_COLORS.length]});});
    });
    return list;
  },[modules]);
  const activeDays=React.useMemo(()=>DAYS.filter(d=>allLessons.some(l=>l.day===d)),[allLessons]);
  const days=activeDays.length?activeDays:DAYS.slice(0,5);
  if(!modules.length) return React.createElement('div',{className:'flex items-center justify-center h-48 text-slate-500 text-sm'},'Add modules to see your timetable');
  return React.createElement('div',{className:'overflow-x-auto rounded-xl border '+border},
    React.createElement('div',{className:'min-w-[700px]'},
      React.createElement('div',{className:'grid',style:{gridTemplateColumns:`56px repeat(${days.length},1fr)`}},
        React.createElement('div',{className:`${headerBg} ${border} border-b border-r p-2`}),
        days.map(d=>React.createElement('div',{key:d,className:`${headerBg} ${border} border-b border-r p-2 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider`},d.slice(0,3)))
      ),
      HOURS.map(h=>{
        const hStr=h.toString().padStart(2,'0')+'00';
        return React.createElement('div',{key:h,className:'grid',style:{gridTemplateColumns:`56px repeat(${days.length},1fr)`}},
          React.createElement('div',{className:`${headerBg} ${border} border-b border-r p-1 text-right text-[10px] text-slate-500 pr-2 pt-2`},formatTime(hStr)),
          days.map(d=>{
            const slot=allLessons.find(l=>l.day===d&&timeToMinutes(l.startTime)===h*60);
            return React.createElement('div',{key:d,className:`${cellBg} ${border} border-b border-r relative`},
              slot?React.createElement('div',{className:'absolute inset-0.5 rounded flex flex-col justify-start p-1 overflow-hidden text-white',style:{
                backgroundColor:slot.color+'dd',
                minHeight:'50px',
              }},
                React.createElement('div',{className:'text-[10px] font-bold leading-tight'},slot.code),
                React.createElement('div',{className:'text-[9px] opacity-80 leading-tight'},slot.lessonType?.slice(0,3))
              ):React.createElement('div',{className:'h-[52px]'})
            );
          })
        );
      })
    )
  );
}

// -- Risk Card --------------------------------------------------------------
function RiskCard({mod,onRemove}){
  const [open,setOpen]=React.useState(false);
  const cls=`rounded-2xl border p-5 transition-all duration-200 ${
    mod.risk.level==='HIGH'?'risk-glow-high bg-red-950/20 border-red-500/30':
    mod.risk.level==='MEDIUM'?'risk-glow-med bg-amber-950/20 border-amber-500/30':
    'risk-glow-low bg-emerald-950/20 border-emerald-500/30'
  }`;
  const altSlots=(mod.lessons||[]).filter(l=>!getPeakRisk(l)&&l.lessonType&&l.lessonType.toLowerCase().includes('tutorial'));
  return React.createElement('div',{className:cls},
    React.createElement('div',{className:'flex items-start justify-between gap-3'},
      React.createElement('div',{className:'flex-1 min-w-0'},
        React.createElement('div',{className:'flex flex-wrap items-center gap-2 mb-1'},
          React.createElement('span',{className:'font-bold text-base tracking-tight',style:{color:mod.color||'#60a5fa'}},mod.code),
          React.createElement(RiskBadge,{level:mod.risk.level})
        ),
        React.createElement('div',{className:'text-sm text-slate-400 font-medium truncate'},mod.title||'Loading�')
      ),
      React.createElement('button',{onClick:()=>onRemove(mod.code),className:'text-slate-500 hover:text-red-400 transition-colors text-lg leading-none mt-0.5'},'�')
    ),
    mod.risk.reasons.length>0&&React.createElement('div',{className:'mt-3'},
      mod.risk.reasons.map((r,i)=>React.createElement('div',{key:i,className:'flex items-start gap-2 text-xs text-slate-400 mt-1'},
        React.createElement('span',{className:'mt-0.5 shrink-0','aria-hidden':'true'},'?'),r
      ))
    ),
    React.createElement('div',{className:'mt-3'},
      React.createElement('button',{
        onClick:()=>setOpen(!open),
        className:'text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors flex items-center gap-1'
      },'?? Mitigation Strategies ',open?'?':'?'),
      open&&React.createElement('div',{className:'mt-2 p-3 rounded-xl bg-slate-800/60 text-xs text-slate-300 space-y-1'},
        mod.risk.level==='HIGH'?React.createElement(React.Fragment,null,
          React.createElement('p',{className:'font-semibold text-amber-400'},'? High competition detected:'),
          React.createElement('p',null,'� Bid early � set a calendar alert for CourseReg round 1 open'),
          React.createElement('p',null,'� Consider S/U option if this is a breadth module'),
          altSlots.length?React.createElement('p',null,`� Non-peak alternatives: ${altSlots.map(l=>l.day+' '+formatTime(l.startTime)).slice(0,3).join(', ')}`):null,
          React.createElement('p',null,'� Have a back-up: check if a similar module covers the same content')
        ):mod.risk.level==='MEDIUM'?React.createElement(React.Fragment,null,
          React.createElement('p',{className:'font-semibold text-amber-400'},'? Moderate risk:'),
          React.createElement('p',null,'� Monitor bid prices weekly on NUSMods price dashboard'),
          React.createElement('p',null,'� Prepare alternative slot selections before round opens'),
          React.createElement('p',null,'� Join module Telegram groups early for inside tips')
        ):React.createElement(React.Fragment,null,
          React.createElement('p',{className:'font-semibold text-emerald-400'},'? Low risk:'),
          React.createElement('p',null,'� This module looks safe � maintain your current slot selection'),
          React.createElement('p',null,'� Use saved bidding points for higher-risk modules'),
          React.createElement('p',null,'� Double-check prerequisites are fulfilled before round 2')
        )
      )
    )
  );
}

// -- TAB 1: CourseReg Strategist --------------------------------------------
function CourseRegTab({toast}){
  const [modules,setModules]=useLocalStorage('nms-modules',[]);
  const [input,setInput]=React.useState('');
  const [loading,setLoading]=React.useState(false);
  const [loadingCode,setLoadingCode]=React.useState('');

  async function fetchModule(code){
    const url=`https://api.nusmods.com/v2/${AY}/modules/${code.toUpperCase()}.json`;
    const res=await fetch(url);
    if(!res.ok)throw new Error(`Module ${code} not found`);
    return res.json();
  }

  async function addModules(){
    const raw=input.trim();
    if(!raw)return;
    // Check if NUSMods URL
    const fromURL=parseNUSModsURL(raw);
    const codes=fromURL||raw.split(/[\s,]+/).map(c=>c.trim().toUpperCase()).filter(c=>/^[A-Z]{2,4}\d{4}[A-Z]?$/.test(c));
    if(!codes.length){toast('Invalid module code or NUSMods URL','error');return;}
    const newCodes=codes.filter(c=>!modules.find(m=>m.code===c));
    if(!newCodes.length){toast('All modules already added','info');setInput('');return;}
    setLoading(true);
    const results=[];
    for(const code of newCodes){
      setLoadingCode(code);
      try{
        const data=await fetchModule(code);
        const sem=data.semesterData?.find(s=>s.semester===1||s.semester===2);
        const lessons=sem?.timetable||[];
        const risk=calcRisk(data,lessons);
        const mi=modules.length+results.length;
        results.push({code,title:data.title,lessons,risk,color:MODULE_COLORS[mi%MODULE_COLORS.length],semesters:data.semesterData?.map(s=>s.semester)});
        toast(`? ${code} added`,'success');
      }catch(e){
        toast(`${code}: ${e.message}`,'error');
      }
    }
    if(results.length)setModules(p=>[...p,...results]);
    setLoading(false);setLoadingCode('');setInput('');
  }

  function removeModule(code){setModules(p=>p.filter(m=>m.code!==code));}
  function clearAll(){setModules([]);}

  const dark=document.documentElement.classList.contains('dark');
  const inputCls=`w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all ${
    dark?'bg-slate-800 border-slate-600 text-slate-100 placeholder-slate-500 focus:border-brand-500':
        'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-brand-500'
  } focus:ring-2 focus:ring-brand-500/30`;

  return React.createElement('div',{className:'animate-fade-in space-y-6'},
    // Header
    React.createElement('div',null,
      React.createElement('h2',{className:'text-xl font-bold text-slate-100'},'?? CourseReg Bidding Strategist'),
      React.createElement('p',{className:'text-sm text-slate-400 mt-1'},'Add NUS module codes or paste a NUSMods sharing URL to analyze your timetable risk.')
    ),
    // Input
    React.createElement('div',{className:'flex gap-3'},
      React.createElement('input',{
        id:'module-input',type:'text',value:input,
        onChange:e=>setInput(e.target.value),
        onKeyDown:e=>e.key==='Enter'&&addModules(),
        placeholder:'CS1010, MA1521 � or paste NUSMods URL',
        className:inputCls,disabled:loading
      }),
      React.createElement('button',{
        onClick:addModules,disabled:loading,
        className:'px-5 py-3 rounded-xl font-semibold text-sm bg-brand-600 hover:bg-brand-500 text-white transition-all disabled:opacity-50 shrink-0'
      },loading?`Fetching ${loadingCode}�`:'Analyze')
    ),
    // Module chips
    modules.length>0&&React.createElement('div',{className:'flex flex-wrap gap-2 items-center'},
      modules.map((m,i)=>React.createElement('div',{key:m.code,className:'chip-in flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow',style:{backgroundColor:m.color||'#3b82f6'}},
        React.createElement('span',null,m.code),
        React.createElement('button',{onClick:()=>removeModule(m.code),className:'opacity-70 hover:opacity-100 text-sm leading-none'},'�')
      )),
      React.createElement('button',{onClick:clearAll,className:'text-xs text-slate-500 hover:text-red-400 transition-colors ml-2'},'Clear all')
    ),
    // Timetable
    modules.length>0&&React.createElement('div',{className:'space-y-2'},
      React.createElement('h3',{className:'text-sm font-semibold text-slate-300'},'?? Visual Timetable'),
      React.createElement(TimetableGrid,{modules})
    ),
    // Risk cards
    modules.length>0&&React.createElement('div',{className:'space-y-3'},
      React.createElement('h3',{className:'text-sm font-semibold text-slate-300'},'?? Module Risk Analysis'),
      modules.map(m=>React.createElement(RiskCard,{key:m.code,mod:m,onRemove:removeModule}))
    ),
    // Empty state
    !modules.length&&React.createElement('div',{className:'flex flex-col items-center justify-center py-20 text-center'},
      React.createElement('div',{className:'text-6xl mb-4'},'??'),
      React.createElement('div',{className:'text-slate-300 font-semibold text-lg'},'No modules added yet'),
      React.createElement('div',{className:'text-slate-500 text-sm mt-1'},'Try: CS2040, MA1521, DSA1101')
    )
  );
}

// -- Ghost Room Card --------------------------------------------------------
function RoomCard({venue,schedule,selectedDay,selectedTime,communityData,onCommunity}){
  const timeMin=timeToMinutes(selectedTime);
  const daySchedule=(schedule||[]).filter(s=>s.day===selectedDay);
  const active=daySchedule.find(s=>timeMin>=timeToMinutes(s.start)&&timeMin<timeToMinutes(s.end));
  const isAvailable=!active;
  // Find next event
  const upcoming=daySchedule
    .filter(s=>timeToMinutes(s.start)>timeMin)
    .sort((a,b)=>timeToMinutes(a.start)-timeToMinutes(b.start))[0];
  const freeUntil=upcoming?upcoming.start:null;
  const freeMins=freeUntil?timeToMinutes(freeUntil)-timeMin:null;
  const freeHours=freeMins?Math.floor(freeMins/60):null;
  const freeMinutes=freeMins?freeMins%60:null;
  const community=communityData[venue]||'unknown';

  const cardCls=`rounded-2xl border p-4 transition-all duration-200 ${
    isAvailable?'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-400/50':'bg-red-950/10 border-slate-700/40'
  }`;

  return React.createElement('div',{className:cardCls},
    React.createElement('div',{className:'flex items-start justify-between gap-2 mb-2'},
      React.createElement('div',null,
        React.createElement('div',{className:'font-bold text-sm text-slate-100'},venue),
        React.createElement('div',{className:'text-xs text-slate-500 mt-0.5'},
          isAvailable?
            (freeUntil?`Empty for ${freeHours?freeHours+'h ':''}${freeMinutes?freeMinutes+'m ':''} ? ${upcoming.code} at ${formatTime(freeUntil)}`:'Empty all day'):
            `Occupied: ${active.code} ${active.type}`
        )
      ),
      React.createElement('span',{className:`shrink-0 px-2 py-0.5 rounded-full text-xs font-bold ${
        isAvailable?'bg-emerald-500/20 text-emerald-300':'bg-red-500/20 text-red-400'
      }`},isAvailable?'AVAILABLE':'OCCUPIED')
    ),
    // Community toggle
    React.createElement('div',{className:'flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/40'},
      React.createElement('span',{className:'text-xs text-slate-500'},'Community:'),
      React.createElement('span',{className:`text-xs font-semibold ${
        community==='empty'?'text-emerald-400':community==='occupied'?'text-red-400':'text-slate-500'
      }`},
        community==='empty'?'? Confirmed empty':community==='occupied'?'? Reported occupied':'Not reported'
      ),
      React.createElement('div',{className:'flex gap-1 ml-auto'},
        React.createElement('button',{
          onClick:()=>onCommunity(venue,'empty'),
          className:`text-[10px] px-2 py-1 rounded-lg font-medium transition-all ${community==='empty'?'bg-emerald-500 text-white':'bg-slate-700 hover:bg-emerald-500/30 text-slate-400'}`
        },'? Empty'),
        React.createElement('button',{
          onClick:()=>onCommunity(venue,'occupied'),
          className:`text-[10px] px-2 py-1 rounded-lg font-medium transition-all ${community==='occupied'?'bg-red-500 text-white':'bg-slate-700 hover:bg-red-500/30 text-slate-400'}`
        },'? Occupied')
      )
    )
  );
}

// -- TAB 2: Ghost Room Finder -----------------------------------------------
function GhostRoomTab(){
  const now=new Date();
  const dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const todayName=dayNames[now.getDay()];
  const nowTime=now.getHours().toString().padStart(2,'0')+now.getMinutes().toString().padStart(2,'0');

  const [zone,setZone]=React.useState(Object.keys(FACULTY_ZONES)[0]);
  const [day,setDay]=React.useState(DAYS.includes(todayName)?todayName:'Monday');
  const [time,setTime]=React.useState(()=>{const h=Math.round(parseInt(nowTime)/100)*100;return h.toString().padStart(4,'0');});
  const [search,setSearch]=React.useState('');
  const [community,setCommunity]=useLocalStorage('nms-community',{});
  const [showAvailableOnly,setShowAvailableOnly]=React.useState(false);

  function useNow(){
    const h=now.getHours().toString().padStart(2,'0');
    const m=(Math.floor(now.getMinutes()/30)*30).toString().padStart(2,'0');
    setTime(h+m);
    setDay(DAYS.includes(todayName)?todayName:'Monday');
  }

  const venues=FACULTY_ZONES[zone]||[];
  const timeBlocks=HOURS.map(h=>h.toString().padStart(2,'0')+'00');

  const filtered=venues.filter(v=>{
    if(search&&!v.toLowerCase().includes(search.toLowerCase()))return false;
    if(showAvailableOnly){
      const sch=MOCK_VENUE_SCHEDULE[v]||[];
      const t=timeToMinutes(time);
      const occupied=sch.filter(s=>s.day===day).some(s=>t>=timeToMinutes(s.start)&&t<timeToMinutes(s.end));
      if(occupied)return false;
    }
    return true;
  });

  // All venues across selected zone for stats
  const allVenues=venues;
  const availCount=allVenues.filter(v=>{
    const sch=MOCK_VENUE_SCHEDULE[v]||[];
    const t=timeToMinutes(time);
    return !sch.filter(s=>s.day===day).some(s=>t>=timeToMinutes(s.start)&&t<timeToMinutes(s.end));
  }).length;

  const dark=document.documentElement.classList.contains('dark');
  const sel=`rounded-xl border px-3 py-2 text-sm outline-none transition-all ${
    dark?'bg-slate-800 border-slate-600 text-slate-100':'bg-white border-slate-200 text-slate-900'
  } focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30`;

  return React.createElement('div',{className:'animate-fade-in space-y-6'},
    React.createElement('div',null,
      React.createElement('h2',{className:'text-xl font-bold text-slate-100'},'?? Ghost Room Finder'),
      React.createElement('p',{className:'text-sm text-slate-400 mt-1'},'Find empty classrooms and lecture theaters across NUS campus.')
    ),
    // Stats bar
    React.createElement('div',{className:'grid grid-cols-3 gap-3'},
      [
        {label:'Zone Venues',val:allVenues.length,icon:'??'},
        {label:'Available Now',val:availCount,icon:'?'},
        {label:'Occupied',val:allVenues.length-availCount,icon:'??'},
      ].map(s=>React.createElement('div',{key:s.label,className:'bg-slate-800/60 border border-slate-700/50 rounded-xl p-3 text-center'},
        React.createElement('div',{className:'text-2xl font-bold text-brand-400'},s.icon+' '+s.val),
        React.createElement('div',{className:'text-xs text-slate-500 mt-1'},s.label)
      ))
    ),
    // Controls
    React.createElement('div',{className:'flex flex-wrap gap-3'},
      React.createElement('select',{value:zone,onChange:e=>setZone(e.target.value),className:sel},
        Object.keys(FACULTY_ZONES).map(z=>React.createElement('option',{key:z,value:z},z))
      ),
      React.createElement('select',{value:day,onChange:e=>setDay(e.target.value),className:sel},
        DAYS.map(d=>React.createElement('option',{key:d,value:d},d))
      ),
      React.createElement('select',{value:time,onChange:e=>setTime(e.target.value),className:sel},
        timeBlocks.map(t=>React.createElement('option',{key:t,value:t},formatTime(t)))
      ),
      React.createElement('button',{onClick:useNow,className:'px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold transition-all'},'?? Right Now'),
      React.createElement('input',{type:'text',value:search,onChange:e=>setSearch(e.target.value),placeholder:'Search room�',className:sel}),
      React.createElement('label',{className:'flex items-center gap-2 text-sm text-slate-400 cursor-pointer'},
        React.createElement('input',{type:'checkbox',checked:showAvailableOnly,onChange:e=>setShowAvailableOnly(e.target.checked),className:'accent-brand-500'}),
        'Available only'
      )
    ),
    // Room grid
    filtered.length>0?React.createElement('div',{className:'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'},
      filtered.map(v=>React.createElement(RoomCard,{
        key:v,venue:v,schedule:MOCK_VENUE_SCHEDULE[v],
        selectedDay:day,selectedTime:time,
        communityData:community,
        onCommunity:(venue,state)=>setCommunity(p=>({...p,[venue]:state}))
      }))
    ):React.createElement('div',{className:'text-center py-16 text-slate-500 text-sm'},'No rooms match your filter.')
  );
}

// -- Sidebar ----------------------------------------------------------------
function Sidebar({tab,setTab,dark,setDark,sidebarOpen,setSidebarOpen}){
  const nav=[
    {id:'coursereg',icon:'??',label:'CourseReg Strategist',sub:'Bidding Risk Analyzer'},
    {id:'ghostroom',icon:'??',label:'Ghost Room Finder',  sub:'Empty Classroom Locator'},
  ];
  const base='flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 select-none group';
  const active='bg-brand-600/20 border border-brand-500/40 text-brand-300';
  const inactive='border border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200';
  return React.createElement(React.Fragment,null,
    // Overlay (mobile)
    sidebarOpen&&React.createElement('div',{className:'fixed inset-0 bg-black/50 z-20 lg:hidden',onClick:()=>setSidebarOpen(false)}),
    React.createElement('aside',{className:`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300 ${sidebarOpen?'translate-x-0':'-translate-x-full'} lg:translate-x-0 w-64 border-r ${dark?'bg-slate-900 border-slate-800':'bg-white border-slate-200'}`},
      // Logo
      React.createElement('div',{className:'px-5 py-6 border-b '+(dark?'border-slate-800':'border-slate-100')},
        React.createElement('div',{className:'flex items-center gap-3'},
          React.createElement('div',{className:'w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-black text-sm shadow-lg'},'NS'),
          React.createElement('div',null,
            React.createElement('div',{className:'font-black text-sm tracking-tight '+(dark?'text-slate-100':'text-slate-900')},'NUS ModSentry'),
            React.createElement('div',{className:'text-[10px] text-slate-500 font-medium'},'Academic Survival Dashboard')
          )
        )
      ),
      // AY badge
      React.createElement('div',{className:'px-5 pt-4'},
        React.createElement('div',{className:'text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-2'},'Academic Year'),
        React.createElement('div',{className:'px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold'},AY)
      ),
      // Nav items
      React.createElement('nav',{className:'flex-1 px-3 mt-4 space-y-1'},
        nav.map(n=>React.createElement('div',{key:n.id,className:`${base} ${tab===n.id?active:inactive}`,onClick:()=>{setTab(n.id);setSidebarOpen(false);}},
          React.createElement('span',{className:'text-xl leading-none'},n.icon),
          React.createElement('div',{className:'min-w-0'},
            React.createElement('div',{className:'text-sm font-semibold leading-tight truncate'},n.label),
            React.createElement('div',{className:'text-[10px] text-slate-500 mt-0.5 truncate'},n.sub)
          )
        ))
      ),
      // Dark mode toggle + footer
      React.createElement('div',{className:'px-5 py-5 border-t '+(dark?'border-slate-800':'border-slate-100')},
        React.createElement('button',{
          onClick:()=>{setDark(!dark);document.documentElement.classList.toggle('dark',!dark);},
          className:'flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors w-full'
        },
          React.createElement('span',null,dark?'?':'??'),
          React.createElement('span',null,dark?'Light Mode':'Dark Mode'),
          React.createElement('div',{className:`ml-auto w-9 h-5 rounded-full transition-all ${dark?'bg-brand-600':'bg-slate-300'} relative`},
            React.createElement('div',{className:`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${dark?'left-4':'left-0.5'}`})
          )
        ),
        React.createElement('div',{className:'mt-3 text-[10px] text-slate-600 text-center'},'Data: NUSMods V2 API � AY'+AY)
      )
    )
  );
}

// -- Root App ---------------------------------------------------------------
function App(){
  const [tab,setTab]=useLocalStorage('nms-tab','coursereg');
  const [dark,setDark]=React.useState(()=>document.documentElement.classList.contains('dark'));
  const [sidebarOpen,setSidebarOpen]=React.useState(false);
  const {toasts,add:toast,remove}=useToast();

  React.useEffect(()=>{
    document.documentElement.classList.toggle('dark',dark);
    document.body.className=dark?'bg-slate-950 text-slate-100 min-h-screen':'bg-slate-50 text-slate-900 min-h-screen';
  },[dark]);

  const bgMain=dark?'bg-slate-950':'bg-slate-50';
  const topbar=dark?'bg-slate-900/80 border-slate-800':'bg-white/80 border-slate-200';

  return React.createElement('div',{className:'flex min-h-screen '+bgMain},
    React.createElement(Sidebar,{tab,setTab,dark,setDark,sidebarOpen,setSidebarOpen}),
    React.createElement('div',{className:'flex-1 lg:ml-64 flex flex-col min-h-screen'},
      // Top bar (mobile)
      React.createElement('header',{className:`sticky top-0 z-10 flex items-center gap-3 px-4 py-3 border-b glass ${topbar} lg:hidden`},
        React.createElement('button',{onClick:()=>setSidebarOpen(true),className:'text-slate-400 hover:text-slate-200 text-xl p-1'},'?'),
        React.createElement('div',{className:'font-black text-sm tracking-tight '+(dark?'text-slate-100':'text-slate-900')},'NUS ModSentry'),
        React.createElement('div',{className:'ml-auto text-xs text-slate-500'},'AY '+AY)
      ),
      // Main content
      React.createElement('main',{className:'flex-1 px-4 py-6 lg:px-8 lg:py-8 max-w-5xl w-full mx-auto'},
        tab==='coursereg'
          ? React.createElement(CourseRegTab,{toast})
          : React.createElement(GhostRoomTab,null)
      ),
      // Footer
      React.createElement('footer',{className:`text-center text-xs py-4 ${dark?'text-slate-700':'text-slate-400'}`},
        'NUS ModSentry � Built for NUS students � Data from NUSMods V2 Public API � Not affiliated with NUS'
      )
    ),
    React.createElement(Toast,{toasts,remove})
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
