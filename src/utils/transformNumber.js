export default function transformNumber(number) {
    let s = number;
  
    s = s.replace(',', '');
    s = s.replace('.', '');
    s = s.replace('.', '');
    let final = s.substr(-2);
    let myStr = s.slice(0, -2);
    let finalString = myStr+"."+final; 
    let numberFinal = Number(finalString); 
    numberFinal = numberFinal.toFixed(2);
    
    return numberFinal;
  }