# JQuery Questionize
A JQuery plugin for creating a flow of questions with yes/no answears. You get a callback on every answeared question.


## Get Started

Note: Endpoint names has to start with "END".

###HTML:
`

<div class="row">
  <div class="col-md-8">
    <div>
      <div data-question="Q1" data-false="END1" data-true="Q2">
        <h4>Do you like chicken? </h4>
        <div class="button-row">
          <button class="secondarybutton" data-answear="true"
                  name="gender" type="button">Yes</button> <button class=
                                                                   "secondarybutton selected" data-answear="false" name=
                                                                   "gender" type="button">No</button>
        </div>
      </div>
      <div data-question="Q2" data-false="Q3" data-true="END2">
        <button class="secondarybutton" data-back="" type=
                "button">Back</button>
        <h4>Do have a car?</h4>

        <button class="secondarybutton" data-answear="true"
                type="button">Yes</button> <button  data-answear="false" type=
                                                   "button">No</button>

      </div>
      <div data-question="Q3" data-false="END4" data-true="END3">
        <button data-back="" type=
                "button">Back</button>
        <h4>Do you like beer?</h4>

        <div class="button-row">
          <button class="secondarybutton" data-answear="true"
                  type="button">Yes</button> <button data-answear="false" type=
                                                     "button">No</button>
        </div>
      </div>
      <div data-end="END1">
        <p>This is sad.</p>
        <button data-back="" type=
                "button">Back</button>

      </div>
      <div data-end="END2">
        <p>Cool, i like chicken too. Maybe you should get me chicken with your car.</p>
        <button data-back="" type=
                "buttoan">Back</button>

      </div>
      <div data-end="END3">
        <p>Chicken, a car and beer. What are we waiting for?.</p>
        <button data-back="" type=
                "button">Back</button>
      </div>
      <div data-end="END4">
        <p>At least you like chicken.</p>
        <button data-back="" type=
                "button">Back</button>
      </div>
    </div>
  </div>
</div>
`

###Init:
`
$(document).ready(function() {
    $(".preExMeCo").questionize({
        hideAfterAnswear: true,  // optional
        startQuestion: 'Q1' 	 // optional
    }, function(answears) {
    	// do something
        console.log(answears)
    });
})
`