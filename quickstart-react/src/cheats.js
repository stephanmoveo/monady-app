const annotationsObjects = [
    {
      id: 1,
      range: {
        start: 10,
        end: 15,
      },
      shape: {
        x1: 23.47,
        y1: 9.88,
        x2: 60.83,
        y2: 44.2,
      },
      comments: [
        {
          id: 1,
          meta: {
            datetime: "2017-03-28T19:17:32.238Z",
            user_id: 1,
            user_name: "Jack Pope",
          },
          body: "The first comment!",
        },
      ],
    },
  ];



  const pluginOptions = {
    // Collection of annotation data to initialize
    annotationsObjects:getComments,
    // Flexible meta data object (currently used for user data, but addl data can be provided to wrap each comment with metadata - provide the id of the current user and fullname of the current user at minimum, which are required for the UI)
    meta: { user_id: null, user_name: null },
    // Use arrow keys to move through annotations when Annotation mode is active
    bindArrowKeys: true,
    // Show or hide the control panel and annotation toggle button (NOTE - if controls are hidden you must provide custom UI and events to drive the annotations - more on that in "Programmatic Control" below)
    showControls: true,
    // Show or hide the comment list when an annotation is active. If false, the text 'Click and drag to select', will follow the cursor during annotation mode
    showCommentList: true,
    // If false, annotations mode will be disabled in fullscreen
    showFullScreen: true,
    // Show or hide the tooltips with comment preview, and annotation shape, on marker hover or timeline activate
    showMarkerShapeAndTooltips: true,
    // If false, step two of adding annotations (writing and saving the comment) will be disabled
    internalCommenting: true,
    // If true, toggle the player to annotation mode immediately after init. (NOTE - "annotationModeEnabled" event is not fired for this initial state)
    startInAnnotationMode: true,
  };