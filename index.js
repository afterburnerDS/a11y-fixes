'use strict'

const Questions = [
    {question: "How many Portuguese Champion titles does FC Porto have?", 
    answears: [ "3","10", "27","32"],
    correct: 3},

    {question: "How is it called the current stadium of FC Porto ?", 
    answears: [ "Estádio da Luz","Estádio José de Alvalade", "Estádio do Dragão","Estádio das Antas"],
    correct: 3},

    {question: "How much is the total capacity of FC Porto stadium", 
    answears: [ "10.000","50.000", "30.000","80.000"],
    correct: 2},

    {question: "What are the main colors of FC Porto ?", 
    answears: [ "Blue and White","Red and White", "Green and White","Black and White"],
    correct: 1},

    {question: "Who is the current President of FC Porto ?", 
    answears: [ "Jorge Nuno Pinto da Costa","António Nicolau de Almeida", "José Monteido da Costa","Vitor Baía"],
    correct: 1}, 

    {question: "Wha is the current sponsor of FC Porto ?", 
    answears: [ "Revigres","Altice", "Telecel","Zon"],
    correct: 2}, 

    {question: "What is the current equipment brand of FC Porto ? ", 
    answears: [ "Nike","Adidas", "Warriors","New Balance"],
    correct: 4},
    
    {question: "Which of these sports FC Porto does not have ?", 
    answears: [ "Swimming","Boxing", "Football","Rollerblade Hockey"],
    correct: 1},

    {question: "Who is the FC Porto top scorer of all time ?", 
    answears: [ "Jardel","Hernâni", "Aboubakar","Fernando Gomes"],
    correct: 4}, 

    {question: "Who is the current FC Porto player with the most games played for the club ?", 
    answears: [ "Herrera","Danilo", "Brahimi","Felipe"],
    correct: 1}
];

const Scores = ["You must be a benfica fan :/", "Aweosome. You are a true fan !", "Incredible ! FC Porto wants You !"];

const Feedback = [" is a wrong answer !", "The correct answer is "]

const totalQuestions = Questions.length;
let currentQuestion = 0;
let score = 0;
let answearChecked = 0;
let newQuestions = [];
let newQuestion = {};
// let indexQuestion;
let isCorrect;

function renderFinalPageFeedback(){
    //Clean all html elements from feedback and question
    toggleDisplayQuestion();
    if(score >= 0 && score < 6){
        $(".result").text(Scores[0]);
        $(".result").toggleClass("colorIncorrect");

    }else if(score > 5 && score < 9){
        $(".result").text(Scores[1]);
        $(".result").toggleClass("colorMeh");
    }else{
        $(".result").text(Scores[2]);
        $(".result").toggleClass(".colorCorrect");
    }
    toggleFinalScore();
    handleResetGameClicked();
    
}

function toggleFinalScore(){
    //Load a String from the array "scores" with score index
    $(".finalpage").toggleClass("nodisplay");
    $(".result").toggleClass("nodisplay");

    
    $(".valueScore").toggleClass("nodisplay").text("Your score was "+ score + " correct" + " out of " + Questions.length);
    //toggle next question button and new game button, and back to the begining button
    $('.resetBtn').toggleClass("nodisplay");


    
}

function renderNewPageQuestion(){
    // console.log("renderNewPageQuestion ran");
    //     //Load New question randomly from newly copied array "questions"
    //console.log(Questions);
        
        
        newQuestion = newQuestions[Math.floor(Math.random()*newQuestions.length)];
        console.log(newQuestion);
         processQuestion();

}

function processQuestion(){
    
    //Decide if last page was welcome page or questionpage
        let classList = $(".answears").prop("classList");
            if(-1 != $.inArray("nodisplay",classList)){
                //first question 
                console.log("first question");  
                firstQuestion();
                    
            }else {
                //next questions
                console.log("furthter questions");
                nextQuestion();
            }
        
}

function firstQuestion(){
    // console.log("PRIMEIRA PERGUNTA");
    //Set html elemts of NewPageQuestion
    toggleDisplayQuestion();
    //adjust titles class
    $(".header > div:first-child").css({"margin-right": "auto"});
    $(".header > div:first-child").css({"width": "19rem"});
    //Remomve elements of welcome page
    toggleDisplayWelcomePage();
    setNewQuestionAnswears();
    handleSubmitQuestionClicked();
    handleNextQuestionClicked();
}

function nextQuestion(){
    
    setNewQuestionAnswears();
    handleSubmitQuestionClicked();
    handleNextQuestionClicked();
    
}

function setNewQuestionAnswears(){

   
  
            //Set question
        $(".question").text(newQuestion.question);
        //Set answears
        $(".textanswear1").text(newQuestion.answears[0]);
        $(".textanswear2").text(newQuestion.answears[1]);
        $(".textanswear3").text(newQuestion.answears[2]);
        $(".textanswear4").text(newQuestion.answears[3]);
        console.log("Inserted new question and answears");

   
    
}

function renderNewPage(){
   
    // console.log("renderNewPage ran");
    //Compare currentQuestion and totalQuestions,
    //if currentQuestion is inferior, call renderNewPageQuestion´, if is equal, call renderFinalPageFeedback

    if(currentQuestion <= totalQuestions ){
        
        renderNewPageQuestion();
    }else{
        renderFinalPageFeedback();
    } 
    
}

function toggleFeedback(){
    
    // console.log("handleSubmitQuestionClicked ran");
    
    console.log("resposta" +answearChecked);
    //Check if the submitted answear is the correct answear of that particular question
    
    if ('correct' in newQuestion){
        // console.log("newQuestiono tem correct" + newQuestion.correct);
        //show/hide feedback
       
        if(newQuestion.correct == answearChecked) {
        //Display "youre correct" or "your re wrong" below the titles, depending on the first result

        // console.log("CORRECTO");
        
            $('.feedback__positive').toggleClass("nodisplay");
            $('.feedback__positive').text("Correct! " +Feedback[1] + newQuestion.answears[answearChecked-1]);
            $('.feedback__positive').toggleClass("colorCorrect");
            //update  isCorrect
            isCorrect =true;
            //Hide/ Show green border and check symbol on correct answear
            $("input[name=answears][value=" + newQuestion.correct + "]").parent().toggleClass("bordercorrect");
            $("input[name=answears][value=" + newQuestion.correct + "]").siblings(".answears__item__button--correct").toggleClass("nodisplay");

            // console.log("eu meti tudo a verde");
        }else { 
            //update  isincorrect

            // console.log("INCORRECTO");
            isCorrect =false;
            $('.feedback__negative').toggleClass("nodisplay");
            $('.feedback__negative').text(newQuestion.answears[answearChecked-1]+Feedback[0]);
            $('.feedback__negative').toggleClass("colorIncorrect");
            $('.feedback__positive').toggleClass("nodisplay");
            $('.feedback__positive').text(Feedback[1] +newQuestion.answears[newQuestion.correct-1]);
            $('.feedback__positive').toggleClass("colorCorrect");
            //Hide / Show red border and x symbol if the submitted answear was not the correct one
            $("input[name=answears][value=" + answearChecked + "]").parent().toggleClass("borderincorrect");
            $("input[name=answears][value=" + answearChecked + "]").siblings(".answears__item__button--incorrect").toggleClass("nodisplay");
            //Hide/ show border and span of the correct one
            $("input[name=answears][value=" + newQuestion.correct + "]").parent().toggleClass("bordercorrect");
            $("input[name=answears][value=" + newQuestion.correct + "]").siblings(".answears__item__button--correct").toggleClass("nodisplay");
        }
        
        //disable /unbale form
        $('.answears__item__button--button').prop('disabled', (i, v) => !v);
        
        // toggle button nextquestion and toggle Submit button 
        $('.answears__btnsub--next').toggleClass("nodisplay");
         console.log("after toggleClass"+ $(".answears__btnsub--next").prop("classList"));
        $('.answears__btnsub--sub').toggleClass("nodisplay");

    }

}


function toggleDisplayQuestion(){
    //Set nodisplay  answears, question, back to begining button, currentQuestion
    $(".answears").toggleClass("nodisplay");
    $(".question").toggleClass("nodisplay");
    $(".resetBtn").toggleClass("nodisplay");
    $(".currentQuestion").toggleClass("nodisplay");
    $(".infoGame").toggleClass("nodisplay");
     //no score, so readjust titles
     $(".header > div:first-child").css({"margin-right": "0"});
     $(".header > div:first-child").css({"width": "0"});
}


function toggleDisplayWelcomePage(){
    //set display on instructions, new game button
    $(".instructions").toggleClass("nodisplay");
    $(".newGameBtn").toggleClass("nodisplay");
}

function renderWelcomePage(){
    
    if(currentQuestion > 0 ){
    //reset game
        if(currentQuestion >= 10){
            //comes from the final
            //removes finalpage elements
            toggleFinalScore();
        }else{
            let classListNegative = $(".feedback__negative").prop("classList");
            let classListPositive = $(".feedback__positive").prop("classList");
            if(-1 != $.inArray("nodisplay",classListNegative) && -1 != $.inArray("nodisplay",classListPositive) ){
                //question page
                toggleDisplayQuestion();
            }else{
                //feedback page
                toggleFeedback();
                toggleDisplayQuestion();
            }
        }

    }else{
        //first game
        // console.log("renderWelcomePage");
        //hiding html elements from questionpage
        toggleDisplayQuestion();
    }
    //showing welcome page elements and eventlistner for newgame button
    toggleDisplayWelcomePage();
    handleStartGameClicked();
    
    

}

function handleStartGameClicked(){

   
    $(".newGameBtn").off('click');
    $('.newGameBtn').on('click', event => {
       console.log("NOVO JOGO");
        //event.preventDefault();
        // console.log("handleStartGameClicked ran");
      

        //new arry of questions
        newQuestions = Questions.slice();
        console.log(newQuestions);
        //reset score and currentquestion
        score = 0;
        currentQuestion = 1;
        $(".currentQuestion").text(currentQuestion + "/10 Question");
        $(".score__correct").text(score + " correct / ");
        $(".score__incorrect").text((currentQuestion-1) - score + " incorrect");
        
         //call renderNewPage()
         renderNewPage();
        
      });
}

function handleNextQuestionClicked(){

    $(".answears__btnsub--next").off('click');
    
    $('.answears__btnsub--next').on('click', event => {
        //remove html elements of feedback
        toggleFeedback(newQuestion);
        
        console.log("Removed feedback");
        //remove current questionn
        let indexQuestion = newQuestions.indexOf(newQuestion);
        if(indexQuestion > -1){
            newQuestions.splice(indexQuestion, 1);
        }
         
    //update score
    if(isCorrect){
        score++;
    }
    //update currentQuestion
    currentQuestion++; 

    $(".currentQuestion").text(currentQuestion + "/" + Questions.length + " Question");
    $(".score__correct").text(score + " correct /  ");
    $(".score__incorrect").text((currentQuestion-1) - score + "  incorrect");

    console.log(score + "correct");



    //call renderNewpage();
    renderNewPage();

    });

    
}

function handleResetGameClicked(){
    
    $(".resetBtn").off('click');

    $(".resetBtn").click(function(event){
        
        renderWelcomePage();
      })
   
}


function handleSubmitQuestionClicked(){

    $(".answears__btnsub--sub").off('click');
    
    // $(".answears input[type='radio']").off('click');


    $(".answears__btnsub--sub").on('click',function(event){
        // code here
        event.preventDefault();
        answearChecked = $('input[name=answears]:checked', '.answears').val();          
        toggleFeedback();
        console.log("Loaded feedback");
      });

    // $(".answears input[type='radio']").submit(function(event){
    //     // code here
    //     event.preventDefault();
    //     answearChecked = $('input[name=answears]:checked', '.answears').val();
    //     toggleFeedback();
    //     console.log("Loaded feedback");
    //   });
}

function handlequestions(){
    renderWelcomePage();
    //  handleStartGameClicked();
    //  handleSubmitQuestionClicked();
    //  handleNextQuestionClicked();
    handleResetGameClicked();
}


$(handlequestions);























