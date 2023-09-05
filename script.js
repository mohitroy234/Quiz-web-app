const startBtn= document.querySelector('.start-btn');
const popUp=document.querySelector('.popup-info');
const main=document.querySelector('.main');
const quizSection=document.querySelector('.quiz-section');
const quizBox=document.querySelector('.quiz-box');
const resultBox=document.querySelector('.result-box');
const tryAgainBtn=document.querySelector('.tryAgain-btn');
const goToHomeBtn=document.querySelector('.goHome-btn');

function Myfunction(){
    console.log(popUp);
    popUp.classList.add("active");
    main.classList.add("active");
    
}
function onTap(){
    popUp.classList.remove("active");
    main.classList.remove("active");
}
function onPress(){
    quizSection.classList.add('active');
    popUp.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add("active");
    getQuestion(0);
}
let questionCount=0;
let scoreCount=0;
const nextBtn=document.querySelector('.next-btn');
function onClick(){
    if(questionCount<questions.length-1){
    questionCount++;
    getQuestion(questionCount);
    nextBtn.classList.remove('active');
    }
    else{
        showResultBox();
    }
}
const optionList=document.querySelector('.option-list');
const quesNo=document.querySelector('.question-total');

function getQuestion(index){
    const questionText=document.querySelector('.question-text');
    questionText.textContent=`${questions[index].num}. ${questions[index].question}`;
    
    let optionTag=`<div class="options"><span>${questions[index].options[0]}</span></div>
    <div class="options"><span>${questions[index].options[1]}</span></div>
    <div class="options"><span>${questions[index].options[2]}</span></div>
    <div class="options"><span>${questions[index].options[3]}</span></div>`

    quesNo.textContent=`${questions[index].num} of 5 Questions`

    optionList.innerHTML=optionTag;

    const option=document.querySelectorAll('.options');
    for(let i=0;i<option.length;i++){
        option[i].setAttribute('onclick','optionSelected(this)')
    }
}

function optionSelected(answer){
    console.log(answer);
    let allOptions=optionList.children.length;
    if(answer.textContent==questions[questionCount].answer){
        answer.classList.add('correct');
        scoreCount++;
        headerScore();
    }else{
        answer.classList.add('incorrect');
        for(let i=0;i<allOptions;i++){
            if(optionList.children[i].textContent==questions[questionCount].answer){
                optionList.children[i].setAttribute('class','options correct')
            }
        }
    }
    for(let i=0;i<allOptions;i++){
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}

function headerScore(){
    const headerScoreText=document.querySelector('.header-score');
    headerScoreText.textContent=`Score: ${scoreCount} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    
    const scoreText=document.querySelector('.score-text');
    scoreText.textContent=`Your Score ${scoreCount} out of ${questions.length}`;

    const circularProgress=document.querySelector('.circular-progress');
    const progressValue=document.querySelector('.progress-value');
    let progressStartValue=0;
    let progressEndValue=(scoreCount/questions.length)*100;
    let speed=20;

    let progress = setInterval(() =>{
        progressStartValue++;
        progressValue.textContent=`${progressStartValue}%`;
        circularProgress.style.background=`conic-gradient(#c40094 ${progressStartValue*3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if(progressStartValue == progressEndValue){
            clearInterval(progress);
        }
    },speed);
}
function tryAgain(){
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount=0;
    quesNo=1;
    scoreCount=0;
    getQuestion(questionCount);
    headerScore();
    
}

function goHome(){
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount=0;
    quesNo=1;
    scoreCount=0;
    getQuestion(questionCount);
    headerScore();
}
// function getOptions(index){
//     let pos=0,child=1;
//     while(pos<4){
//     const options=document.querySelector(`.option-list .options:nth-child(${child})`);
//     options.textContent=`${questions[index].options[pos]}`;
//     child++;
//     pos++;
//     }
// }
