
const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(Number(n)||0);
const num = id => parseFloat(document.getElementById(id)?.value) || 0;
function out(html){document.getElementById('result').innerHTML=html}
function calcSalary(){
  const annual=num('annual'), pay=num('pay'), freq=document.getElementById('freq').value;
  let a=annual||pay*({weekly:52,biweekly:26,semimonthly:24,monthly:12}[freq]||52);
  out(`<div class="big">${money(a)}</div><small>Estimated annual gross income</small><hr><b>Monthly:</b> ${money(a/12)} &nbsp; <b>Biweekly:</b> ${money(a/26)} &nbsp; <b>Weekly:</b> ${money(a/52)}`);
}
function calcHourly(){const h=num('hourly'),hrs=num('hours'),w=num('weeks');const a=h*hrs*w;out(`<div class="big">${money(a)}</div><small>Estimated annual gross income</small><hr>Monthly ${money(a/12)} · Biweekly ${money(a/26)} · Weekly ${money(a/w)}`)}
function calcOvertime(){const h=num('rate'),ot=num('ot'),reg=num('regular');const total=reg*h+ot*h*1.5;out(`<div class="big">${money(total)}</div><small>Estimated gross pay for this period</small><hr>Regular: ${money(reg*h)} · Overtime: ${money(ot*h*1.5)}`)}
function calcTip(){const bill=num('bill'),tip=num('tip'),people=Math.max(1,num('people'));const t=bill*tip/100,total=bill+t;out(`<div class="big">${money(total/people)}</div><small>Each person pays</small><hr>Tip: ${money(t)} · Total: ${money(total)} · Tip per person: ${money(t/people)}`)}
function calcAge(){const d=new Date(document.getElementById('birth').value);if(isNaN(d)){out('<span class="error">Enter a valid birth date.</span>');return}const now=new Date();let y=now.getFullYear()-d.getFullYear();let m=now.getMonth()-d.getMonth();if(now.getDate()<d.getDate())m--;if(m<0){y--;m+=12}out(`<div class="big">${y} years</div><small>Approximately ${m} additional months</small>`)}
function calcDays(){const a=new Date(document.getElementById('date1').value),b=new Date(document.getElementById('date2').value);if(isNaN(a)||isNaN(b)){out('<span class="error">Enter both dates.</span>');return}out(`<div class="big">${Math.abs(Math.round((b-a)/86400000)).toLocaleString()}</div><small>Days between the selected dates</small>`)}
function calcPercent(){const a=num('part'),b=num('whole');out(`<div class="big">${b?((a/b)*100).toFixed(2):0}%</div><small>${a} is this percentage of ${b}</small>`)}
function calcGpa(){const ids=['g1','g2','g3','g4'];const vals=ids.map(id=>num(id)).filter(v=>v>0);const avg=vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:0;out(`<div class="big">${avg.toFixed(2)}</div><small>Unweighted GPA estimate on a 4.0 scale</small>`)}
function numEl(v){return parseFloat(v)||0}
function calcCarPayment(){
 const p=num('price'),dp=num('down'),trade=num('trade'),fees=num('fees'),tax=num('tax'),apr=num('apr'),years=num('years');
 const principal=Math.max(0,(p-dp-trade+fees)*(1+tax/100)),r=apr/100/12,n=years*12;
 const pay=r?principal*r/(1-Math.pow(1+r,-n)):principal/n;
 out(`<div class="big">${money(pay)}/mo</div><small>Estimated monthly payment</small><hr>Amount financed: ${money(principal)} · Total of payments: ${money(pay*n)} · Interest: ${money(pay*n-principal)}`);
}
function calcAfford(){const income=num('income'),debts=num('debts'),down=num('cdown'),term=num('cterm'),apr=num('capr');const monthly=income/12,available=Math.max(0,monthly*.15-debts);const r=apr/100/12,n=term*12;const loan=r?available*(1-Math.pow(1+r,-n))/r:available*n;out(`<div class="big">${money(loan+down)}</div><small>Illustrative vehicle price at a 15% gross-income payment guideline</small><hr>Estimated payment budget: ${money(available)}/mo. This is a planning estimate, not financial advice.`)}
function calcGas(){const miles=num('miles'),mpg=num('mpg'),gas=num('gas');const gallons=mpg?miles/mpg:0;out(`<div class="big">${money(gallons*gas)}</div><small>Estimated fuel cost</small><hr>Fuel used: ${gallons.toFixed(2)} gallons · Cost per mile: ${money((gallons*gas)/Math.max(1,miles))}`)}
function calcAmort(){const p=num('loan'),apr=num('lamapr'),years=num('lamyears');const r=apr/100/12,n=years*12;const pay=r?p*r/(1-Math.pow(1+r,-n)):p/n;out(`<div class="big">${money(pay)}/mo</div><small>Estimated monthly payment</small><hr>Total payments: ${money(pay*n)} · Total interest: ${money(pay*n-p)}`)}
function calcLease(){const msrp=num('msrp'),cap=num('cap'),res=num('res'),term=num('lterm'),mf=num('mf'),down=num('ldown');const dep=Math.max(0,(cap-res)/term),finance=(cap+res)*mf,total=dep+finance,monthly=Math.max(0,total-down/term);out(`<div class="big">${money(monthly)}/mo</div><small>Illustrative lease payment before taxes and fees</small>`)}
function calcDown(){const p=num('dprice'),pct=num('dpct');out(`<div class="big">${money(p*pct/100)}</div><small>Estimated down payment</small><hr>Remaining amount: ${money(p*(1-pct/100))}`)}
function calcInterest(){const p=num('ip'),apr=num('iapr'),years=num('iyears');const i=p*apr/100*years;out(`<div class="big">${money(i)}</div><small>Simple-interest estimate over the full term</small>`)}
function calcMile(){const fuel=num('mfuel'),maint=num('mmaint'),ins=num('mins'),other=num('mother'),miles=num('mmiles');const total=fuel+maint+ins+other;out(`<div class="big">${money(total/Math.max(1,miles))}</div><small>Estimated cost per mile</small><hr>Total annual cost: ${money(total)}`)}
function filterCards(){const q=document.getElementById('siteSearch').value.toLowerCase();document.querySelectorAll('[data-search]').forEach(x=>x.classList.toggle('hidden',q && !x.dataset.search.toLowerCase().includes(q)))}
