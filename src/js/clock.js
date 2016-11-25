const targetDate = new Date();
targetDate.setHours(targetDate.getHours());

function getTimeSegmentElements(segmentElement) {
  const segmentDisplay = segmentElement.querySelector(
    '.card-display'
  );
  const segmentDisplayTop = segmentDisplay.querySelector(
    '.card-display_top'
  );
  const segmentDisplayBottom = segmentDisplay.querySelector(
    '.card-display_bottom'
  );

  const segmentOverlay = segmentDisplay.querySelector(
    '.card-overlay'
  );
  const segmentOverlayTop = segmentOverlay.querySelector(
    '.card-overlay_top'
  );
  const segmentOverlayBottom = segmentOverlay.querySelector(
    '.card-overlay_bottom'
  );

  return {
    segmentDisplayTop,
    segmentDisplayBottom,
    segmentOverlay,
    segmentOverlayTop,
    segmentOverlayBottom,
  };
}

function updateSegmentValues(
  displayElement,
  overlayElement,
  value
) {
  displayElement.textContent = value;
  overlayElement.textContent = value;
}

function updateTimeSegment(segmentElement, timeValue) {
  const segmentElements =
    getTimeSegmentElements(segmentElement);

  if (
    parseInt(
      segmentElements.segmentDisplayTop.textContent,
      10
    ) === timeValue
  ) {
    return;
  }

  segmentElements.segmentOverlay.classList.add('flip');

  updateSegmentValues(
    segmentElements.segmentDisplayTop,
    segmentElements.segmentOverlayBottom,
    timeValue
  );

  function finishAnimation() {
    segmentElements.segmentOverlay.classList.remove('flip');
    updateSegmentValues(
      segmentElements.segmentDisplayBottom,
      segmentElements.segmentOverlayTop,
      timeValue
    );

    this.removeEventListener(
      'animationend',
      finishAnimation
    );
  }

  segmentElements.segmentOverlay.addEventListener(
    'animationend',
    finishAnimation
  );
}

function updateTimeSection(sectionID, timeValue) {
  
  const sectionElement = document.getElementById(sectionID);
  const timeSegments =
    sectionElement.querySelectorAll('.clock-segment');

    if (sectionID === 'millisec'){
        const firstNumber = Math.floor(timeValue / 100) || 0;
        const secondNumber = Math.floor((timeValue % 100) / 10) || 0;
        const thirdNumber = timeValue % 10 || 0;
        updateTimeSegment(timeSegments[0], firstNumber);
        updateTimeSegment(timeSegments[1], secondNumber);
        updateTimeSegment(timeSegments[2], thirdNumber);
    }
    else{
        const firstNumber = Math.floor(timeValue / 10) || 0;
        const secondNumber = timeValue % 10 || 0;
        updateTimeSegment(timeSegments[0], firstNumber);
        updateTimeSegment(timeSegments[1], secondNumber);
    }
  
}

function getTimeRemaining(targetDateTime) {
  const nowTime = Date.now();
  const complete = nowTime >= targetDateTime;

  if (complete) {
    return {
      complete,
      seconds: 0,
      minutes: 0,
      hours: 0,
    };
  }

  const secondsRemaining = Math.floor(
    (targetDateTime - nowTime) / 1000
  );
  const hours = Math.floor(secondsRemaining / 60 / 60);
  const minutes =
    Math.floor(secondsRemaining / 60) - hours * 60;
  const seconds = secondsRemaining % 60;

  return {
    complete,
    seconds,
    minutes,
    hours,
  };
}

function updateAllSegments() {
  const timeRemainingBits = new Date()
  updateTimeSection('millisec', timeRemainingBits.getMilliseconds());
  updateTimeSection('seconds', timeRemainingBits.getSeconds());
  updateTimeSection('minutes', timeRemainingBits.getMinutes());
  updateTimeSection('hours', timeRemainingBits.getHours());

  return timeRemainingBits.complete;
}

updateAllSegments();
setInterval(updateAllSegments, 300);