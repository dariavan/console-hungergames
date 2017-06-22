// голодные игры
const EVALUATION_RATE = 5;

function Human(name, age, lastJob) {
   this.name=name || "у девочки нет имени";
   this.age=age || "секретик";
   this.lastJob=lastJob || "неизвестно";
   this.who=function(){
     // let only in this {}
     let tempInfo = ['Имя:', this.name, '.Возраст:', this.age, '.Прежнее место работы:', this.lastJob].join('');
    console.log(tempInfo);
   };
}

function Characteristics(keySkill, englishLevel, name, age, lastJob, productivity){
   this.base=Human;
   this.base(name, age, lastJob);
   this.keySkill=keySkill || 'обаяние';
   this.englishLevel=englishLevel;
   this.productivity = productivity || 0;
   this.info=function(showProductivity){
      console.log('Основной скилл: %s. Уровень владения английским: %s', this.keySkill, this.englishLevel);
      if (showProductivity){
        console.log("Общая оценка: " + this.productivity);
      }
      console.log('');
   };
}

var human = [];
human[0] = new Characteristics('java','B2','Паша', 26,'экономист');
human[1] = new Characteristics('javaScript','A2','Саша', '21','дизайнер');
human[2] = new Characteristics();
human[3] = new Characteristics('С++','C1','Маша', '48','пекарь');

function information(noWarnings, showProductivity){
for (let i=0; i<human.length; i++){
  try{
    if(!human[i].englishLevel){
      throw new SyntaxError("Данные некорректны");
    }
  }catch (e){
    if(!noWarnings){
    console.warn(e.name + " detected: проблема с английским у " + [i+1] + " кандидата, deal with it");
  }
    human[i].englishLevel = 0;
  }finally{
    human[i].who();
    human[i].info(showProductivity);
  }
  }
};

// closure
function evaluationEnglish(englishLevel){
    let tempValue = englishLevel;
    switch(englishLevel){
    	case 'A2': tempValue=5;
    	break;
    	case 'B2': tempValue=9;
    	break;
    	case 'C1': tempValue=11;
    	break;
    	default: tempValue=0;
    	break;
    }
    return function(rate){ return tempValue * rate;};
}
// рандомная функция удача
// callback
function luck(arg1, arg2, callback) {
    var random = Math.ceil(Math.random() * (arg1 - arg2) + arg2);
    callback(random);
	}

function eraseCandidate(human, callback){
  let averageRate = 0;
  for (let i=0; i<human.length;i++){
      averageRate += human[i].productivity;
      if (i === human.length-1){
        averageRate = averageRate / human.length;
        console.log("\nПорог прохода на проект: " + averageRate);
      }
  }
  callback(averageRate);
 }

information(false, false);
var winners = {};
for (let i=0; i<human.length;i++){
 	human[i].productivity = evaluationEnglish(human[i].englishLevel)(EVALUATION_RATE);
 	// Ф-Я(NUM) вызовется только после выполнения luck
 	luck(5, 9, function (num) {
		console.log("Ваше благородие, госпожа Удача["+ [i+1]+ "]:" + num);
    human[i].productivity +=num;
		});
 	console.log(human[i].productivity);
}

  eraseCandidate(human, function(averageRate){
    let i=0;
    while (true) {
      if (human[i].productivity < averageRate){
        human.splice(i, 1);
      }else{ i++;}
   if(human.length <= 2) break;
  }
});
console.log("\nВ продакшн из лабы попадают: ");
information(true, true);
