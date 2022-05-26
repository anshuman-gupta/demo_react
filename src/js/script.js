// Js code goes here
const startButton = document.getElementById("start-button")
const submitButton = document.getElementById("submit-button")
const question = document.getElementById("question")
const optionsContainer = document.getElementById("options-container")
const loader = document.getElementById("loader-view")
const quiz = document.getElementById("quiz")
const preQuizView = document.getElementById("pre-quiz-instructions")
const ID = document.getElementById("current-question-id").value

// Task 1
// Should render the pre quiz on the screen initially and hide the loader
loader.style.display="none"
submitButton.setAttribute( "disabled", "true" )

// Task 2
// Should show the loader and hide other components on clicking start quiz button
startButton.addEventListener(
  "click",
  async function(){
    loader.style.display="initial"
    preQuizView.style.display="none"
    startButton.style.display="none"
    quiz.style.display="none"

    // T1 - Fetch
    var fetched_que = await fetch(`https://jsonmock.hackerrank.com/api/questions/${ID}`)
    var response = await fetched_que.json()
    console.log(response);
    
    // Task 3
    // Should render the question on ther secreen
    displayQuestion(response)
  }
)

function displayQuestion(response) {
  loader.style.display="none"
  quiz.style.display="block"
  question.innerHTML = response.data["question"]

  // Task 4 
  // Should render ther options for the question on the screen
  response.data["options"].forEach(element => {
  var option = document.createElement("div")
  option.innerHTML = element
  optionsContainer.appendChild(option)
  })
  //Task 5
   checkAnswer(response)
}


 function checkAnswer(response) {
  var ans_stack = []
  var correct_ans = response.data["answer"]

   optionsContainer.childNodes.forEach(element => element.addEventListener(
    "click",
    function () {
      submitButton.disabled = false
      ans_stack.push(this)
      ans_stack.slice(0, ans_stack.length - 1).forEach(element => element.classList.remove("user-answer"))

      var selectedOption = ans_stack.slice(-1)[0]
      selectedOption.classList.add("user-answer")
  
      // checking
       submitButton.addEventListener(
        "click",
        function () {

          if (selectedOption.innerHTML == response.data.options[correct_ans]) {
            selectedOption.classList.add("correct-answer")
            //location.reload()
          } 
          if(selectedOption.innerHTML != response.data.options[correct_ans]){
            selectedOption.classList.add("wrong-answer")
            optionsContainer.childNodes[response.data["answer"]+1].classList.add("correct-answer")
            //location.reload()
            }
          }
        )
      }
    )
  )
}
