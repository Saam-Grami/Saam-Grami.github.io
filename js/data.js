/* ============================================================
   data.js — THIS IS THE ONLY FILE YOU NEED TO EDIT NORMALLY.
   Everything on the site is generated from the lists below.
   No layout, no styling, no logic lives here.
   ============================================================ */

// ---- BLOG TOGGLE ----
// Set to true when you actually have posts to show. False hides the whole
// section and its nav link, and the other sections renumber themselves.
const SHOW_BLOG = false;

// ---- CV TOGGLE ----
// Set to true once you have a CV file. It adds a Résumé / CV switch above the
// viewer. False shows the résumé alone with no tabs.
const SHOW_CV   = false;
const RESUME_FILE = 'Saam Haghighat-Grami Resume.pdf';
const CV_FILE     = 'Saam Haghighat-Grami CV.pdf';

// ---- EDIT YOUR PUBLICATIONS HERE ----
// Leave the array empty and the whole section hides itself.
// kind: "Journal" | "Conference" | "Poster" | "Preprint" | "Workshop" — free text, shown as a pill.
// Your own name is bolded automatically — set MY_NAME below to match how it's written.
const MY_NAME = "S. Haghighat-Grami";
const publications = [
  // No publications listed yet — leave this empty and the whole section stays hidden.
];

// ---- EDIT YOUR EXPERIENCE HERE ----
const experience = [
  {
    when: "Jun 2026 — Aug 2026",
    role: "Funded Undergraduate Researcher — SURP",
    org: "Kennesaw State University · advised by Dr. Matt Marshall",
    image: "media/exp-river-debris.jpg",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "Developed a real-time, edge-deployed system that detects, tracks, and predicts the trajectories of floating river debris.",
      "Used neural networks to address the deficiency of linear Kalman-filter motion predictors in turbulent riverine conditions.",
      "Implemented a class-conditioned LSPIV–LSTM–DNN architecture with a Gaussian uncertainty head for calibrated multi-step forecasts."
    ],
    tags: ["PyTorch", "YOLO", "ByteTrack", "LSTM-DNN", "Jetson Orin Nano", "TensorRT"]
  },
  {
    when: "Jan 2026 — Present",
    role: "Robotic Software Architect — A2G",
    org: "AgriSys Lab, Kennesaw State University · Dr. Muhammad Hassan Tanveer",
    image: "media/exp-a2g.jpeg",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "Designing a UGV–UAV collaborative search-and-rescue system: the UAV surveys the environment while the UGV clears obstacles blocking access to points of interest.",
      "Leading the machine learning and computer vision pipeline that estimates obstacle mass from sensor-fused SLAM point clouds.",
      "Mass estimates determine which obstacles the UGV's manipulator can safely move."
    ],
    tags: ["ROS2", "NAV2", "SLAM", "OpenCV", "Segmentation", "Map Stitching"]
  },
  {
    when: "Aug 2025 — Dec 2025",
    role: "Lead Software Developer — SoilBus",
    org: "AgriSys Lab, Kennesaw State University",
    image: "media/exp-soilbus.png",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "Built a self-offloading soil-monitoring mesh network: probes auto-discover neighboring nodes and relay data to any node without a central hub.",
      "Used an LSTM to process NPK, EC, pH, temperature, moisture, and light-level readings across the network.",
      "Validated routing across 5 physical nodes, holding performance to a simulated 26 nodes before degradation."
    ],
    tags: ["C++", "ESP32", "Ad hoc networking", "LSTM"]
  },
  {
    when: "May 2025 — Aug 2025",
    role: "COOP Engineering Intern",
    org: "EOSYS — Industrial and Manufacturing System Integrator · Marietta, GA",
    image: "media/exp-eosys.jpg",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "Created a Human Machine Interface display creator for P&IDs.",
      "Designed and modified PLCs."
    ],
    tags: ["PLC", "HMI", "Ladder Logic", "TIA Portal"]
  },
  {
    when: "Aug 2022 — Present",
    role: "Ground Radio Repair Specialist",
    org: "United States Marine Corps Reserve · Marietta, GA",
    image: "media/exp-usmc.png",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "Troubleshoot, maintain, and operate USMC radio systems in time-sensitive situations.",
      "Squad Leader of Marines, 4th Combat Readiness Regiment.",
      "Active security clearance."
    ],
    tags: ["RF systems", "Electronics repair", "Leadership"]
  }
];

// ---- EDIT YOUR EDUCATION HERE ----
const education = [
  {
    when: "Jan 2022 — May 2022,\nJan 2024 — Present",
    role: "B.S. Mechatronics Engineering",
    org: "Kennesaw State University",
    image: "media/edu-ksu.jpg",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "CGPA: 4.00",
      "President's List every semester enrolled — awarded for a 4.00 term GPA."
    ],
    tags: ["Spring 2022", "Spring 2024", "Fall 2024", "Spring 2025", "Fall 2025", "Spring 2026"]
  },
  {
    when: "Aug 2022 — Oct 2023",
    role: "Ground Radio Repair School",
    org: "Marine Corps Communication-Electronics School (MCCES)",
    image: "media/edu-mcces.jpg",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "CGPA: 4.00",
      "Holds an active security clearance."
    ],
    tags: []
  },
  {
    when: "Aug 2020 — Dec 2021",
    role: "General Education",
    org: "Chattahoochee Technical College",
    image: "media/edu-chattahoochee.png",   // save your photo with this exact name
    caption: "", // optional one-line caption under the photo
    points: [
      "CGPA: 3.80"
    ],
    tags: []
  }
];

// ---- EDIT YOUR COURSEWORK HERE ----
// image: "media/cw-ml.jpg"  — still shown in the left column
// video: "media/cw-ml.mp4"  — loops in place of the image; image becomes its poster
// Leave both "" and the striped placeholder shows instead.
// doc:   "media/report.pdf" — gives the class its own page with the PDF
//                             rendered inline. Leave "" for no page.
const coursework = [
  {
    title: "Machine Learning",
    org: "Kennesaw State University",
    when: "Spring 2026",
    image: "media/course-ml.png",
    video: "",
    doc: "",
    points: [
      "Neural network fundamentals: perceptrons, forward pass, backpropagation, and gradient descent, with activation functions like ReLU, sigmoid, tanh, and softmax.",
      "Convolutional neural networks (CNNs) for image feature extraction, plus transfer learning on pretrained backbones.",
      "Unsupervised learning with k-means clustering and an introduction to reinforcement learning (RL).",
      "Sequence modeling with LSTMs for time-series and temporal data.",
      "Final project: a CNN that turns a single camera frame into a steering command for a ROSbot chasing an ambulance in Gazebo. Labels were derived from three-point arc geometry rather than recorded by hand."
    ],
    tags: ["PyTorch", "TensorFlow", "CNN", "LSTM", "k-means", "Reinforcement Learning", "Backpropagation", "Transfer learning"]
  },
  {
    title: "Device Control and Simulation of Mobile Robots",
    org: "Kennesaw State University",
    when: "Fall 2025",
    image: "media/course-mobile-robots.png",
    video: "",
    doc: "",
    points: [
      "Wheel encoders and odometry for pose estimation, plus differential-drive kinematics relating left/right wheel velocities to the robot's linear and angular motion.",
      "Wall-following and obstacle-avoidance behaviors driven by live sensor data.",
      "ROS2 nodes and topics controlling the same code on a physical robot and in Gazebo simulation."
    ],
    tags: ["ROS2", "Gazebo", "Encoders", "Odometry", "Differential Drive", "Robot Kinematics"]
  },

  {
    title: "Robot Synthesis",
    org: "Kennesaw State University",
    when: "Spring 2026",
    image: "media/course-robot-synth.jpg",
    video: "",
    doc: "media/robot-synthesis.pdf",   // opens its own page; leave "" for no page
    points: [
      "Denavit–Hartenberg (DH) convention for assigning link frames and building each joint's homogeneous transformation matrix.",
      "Forward kinematics by chaining DH transforms down the arm; inverse kinematics for solving joint angles from a target end-effector pose.",
      "Robot motion and trajectory planning in joint space."
    ],
    tags: ["Kinematics", "DH Convention", "Homogeneous Transforms", "Forward Kinematics", "Inverse Kinematics"]
  },
  {
    title: "Modeling and Feedback/Advanced Controls",
    org: "Kennesaw State University",
    when: "Spring 2025",
    image: "media/course-modeling-and-feedback.png",
    video: "",
    doc: "media/MTRE 3610 Final Project Report.pdf",
    points: [
      "Modeled dynamic systems as transfer functions and block diagrams, simulated in MATLAB/Simulink.",
      "Designed and tuned PID controllers, comparing open-loop vs. closed-loop response.",
      "Stability and performance analysis with root locus and Bode plots, including gain/phase margin.",
      "Second-order and higher-order system response: rise time, overshoot, settling time, damping ratio, natural frequency, and vibration effects.",
      "Advanced Controls follow-on: state-space representation, controllability/observability, pole placement, and observer design."
    ],
    tags: ["MATLAB", "Simulink", "Control Theory", "PID", "Transfer Functions", "Root Locus", "Bode Plot", "State-Space", "Observers"]
  },
  {
    title: "Microcontrollers and PLCs",
    org: "Kennesaw State University",
    when: "Spring 2025",
    image: "media/course-mcu.jpg",
    video: "",
   doc: "",
    points: [
      "Bare-metal ATmega programming: setting I/O registers directly (DDRx, PORTx, PINx) instead of using high-level libraries.",
      "Timers, interrupts, PWM generation, and ADC for reading sensors and driving actuators.",
      "PLC programming in ladder logic alongside the microcontroller work."
    ],
    tags: ["C", "Embedded", "ATmega", "Registers", "Timers & Interrupts", "PWM", "ADC"]
  }
  // {
  //   title: "PLCs",
  //   org: "Kennesaw State University",
  //   when: "",
  //   image: "",
  //   video: "",
  //   doc: "",
  //   points: [],
  //   tags: ["Ladder Logic", "TIA Portal"]
  // }
];

// ---- EDIT YOUR SKILLS HERE ----
const skills = [
  { group: "Languages",       items: ["C++", "Python", "MATLAB", "PLC", "Ladder Logic"] },
  { group: "Frameworks",      items: ["ROS2", "NAV2", "TensorFlow", "PyTorch", "OpenCV"] },
  { group: "Perception & ML", items: ["LSTM-DNN", "YOLO", "ByteTrack", "Segmentation", "LSPIV", "Gaussian NLL"] },
  { group: "Embedded",        items: ["ESP32", "Jetson Orin Nano", "Raspberry Pi 5", "OpenMV", "TensorRT", "Matek H743"] },
  { group: "CAD",             items: ["SolidWorks", "Onshape"] },
  { group: "Developer Tools", items: ["Arduino IDE", "VS Code", "Linux", "TIA Portal"] },
  { group: "Robotics",        items: ["SLAM", "ArduPilot", "UAV–UGV coordination"] }
];

// ---- EDIT YOUR POSTS HERE (only shown when SHOW_BLOG = true) ----
const posts = [
  {
    date: "2026-07-14",
    title: "Why the A2G height sensor kept lying to me",
    excerpt: "A short writeup of a bug that took three weeks and one oscilloscope to find.",
    url: "#"
  }
];

// ---- EDIT YOUR PROJECTS HERE ----
// status: "live" | "progress" | "archived"
// "details" is optional — a longer paragraph (or a few, separated by \n\n) shown only on the project's own page.
// If you leave "details" out, the project page just reuses "blurb".
// "repo" is optional — paste a full GitHub URL and a source link appears on
// the card and the project page. Leave it "" and nothing is shown.
//
// MEDIA — two separate fields:
//   cover  → the single still shown on the card in the projects grid.
//            Always an image (.jpg / .png / .webp). Never a video.
//   media  → everything shown inside the project page, in the order listed.
//            Mix photos and clips freely; the first one loads first.
//            Videos are recognized by extension: .mp4 / .webm / .ogv.
//            Export .mov to .mp4 — most browsers won't play .mov.
//
// A clip can carry a poster (the frame shown before it plays, and the image
// used for its thumbnail) by writing it as an object instead of a string:
//   media: [
//     "media/rb-04-01.mp4",                                        // no poster
//     { src: "media/rb-04-02.mp4", poster: "media/rb-04-02.jpg" }, // with one
//     "media/rb-04-03.jpg"
//   ]
//
// Nothing here is required. No cover → the card shows the striped
// placeholder. Empty media → the project page does too. One item in media →
// it displays on its own with no arrows or thumbnails.
const projects = [
  {
    id: "RB-01",
    title: "DARB",
    subtitle: "Drone Arm Robotic Backpack · personal project",
    status: "progress",
    year: "2025–26",
    cover: "media/rb-01.jpg",     // card image in the projects grid
    media: [              // shown inside the project page, in this order
      "media/rb-01.jpg",
      "media/rb-01.mp4"
    ],
    repo: "",    // e.g. "https://github.com/Saam-Grami/darb"
    blurb: "A wearable robotic arm that retrieves a drone in flight, with the drone aligning itself using computer vision.",
    details: "DARB is a drone docking system built around a robotic arm attached to a mobile, human-wearable platform. I invented and built it independently.\n\nThe custom drone uses computer vision to align with IR LEDs mounted on the wearable platform, and the arm retrieves it mid-flight. The drone will also be able to launch and release from the arm. The whole sequence is autonomously operated.\n\nThe project runs across mechanical design, embedded systems, and flight control at once, since the arm and the aircraft have to agree on where they are relative to each other before a capture is possible.",
    stack: "ArduPilot, Arduino IDE, TensorFlow, computer vision",
    sensors: "OpenMV, IR LED array, stepper encoders",
    platform: "ESP32, Matek H743 WLITE",
    power: "4S LiPo"
  },
  {
    id: "RB-02",
    title: "A2G",
    subtitle: "UAV and UGV collaborative search and rescue",
    status: "progress",
    year: "2025–26",
    cover: "media/rb-02-01.jpg",     // card image in the projects grid
    media: [              // shown inside the project page, in this order
      "media/rb-02-01.jpg",
      "media/rb-02.mp4",
      "media/rb-02-02.jpg",
      "media/rb-02-03.jpg"
    ],
    repo: "",    // e.g. "https://github.com/Saam-Grami/a2g"
    blurb: "A UAV surveys the environment while a UGV clears obstacles blocking access to points of interest.",
    details: "A2G is a UGV–UAV collaborative search-and-rescue system. The UAV surveys the environment while the UGV clears obstacles blocking access to points of interest using an onboard manipulator.\n\nI lead the machine learning and computer vision pipeline that estimates obstacle mass from sensor-fused SLAM point clouds. That estimate determines which obstacles the manipulator can safely move, and it runs alongside the UAV's flight motion rather than after it.\n\nThe interesting problem is not navigation on its own — it is deciding what is worth moving, and committing to that decision with incomplete information.",
    stack: "ROS2, NAV2, OpenCV, SLAM, segmentation",
    sensors: "RGB camera, LiDAR, depth camera",
    platform: "Raspberry Pi 5",
    power: "—"
  },
  {
    id: "RB-04",
    title: "River Debris Trajectory Prediction",
    subtitle: "Uncertainty-aware forecasting · SURP",
    status: "live",
    year: "2026",
    cover: "media/rb-04.png",     // card image in the projects grid
    media: [              // shown inside the project page, in this order
      "media/rb-04.mp4",
      "media/rb-04.png",
      "media/rb-04-02.jpg",
      "media/rb-04-03.jpg",
      "media/rb-04-04.jpg",
      "media/rb-04-05.jpg"
    ],
    repo: "",    // e.g. "https://github.com/Saam-Grami/river-debris"
    blurb: "A real-time edge system that detects, tracks, and forecasts the paths of floating river debris with calibrated uncertainty.",
    details: "I developed a real-time, edge-deployed system that detects, tracks, and predicts the trajectories of floating river debris.\n\nLinear Kalman-filter motion predictors break down in turbulent riverine conditions, so I used neural networks instead: a class-conditioned LSPIV–LSTM–DNN architecture with a Gaussian uncertainty head, producing calibrated multi-step trajectory forecasts over YOLO and ByteTrack detections. The point is that the system reports how confident it is, rather than committing to a single prediction it cannot justify.\n\nThe full pipeline runs on an NVIDIA Jetson Orin Nano. Conducted as SURP research under Dr. Matt Marshall.",
    stack: "PyTorch, Python, TensorRT, OpenCV",
    sensors: "RGB camera, LSPIV",
    platform: "NVIDIA Jetson Orin Nano, Raspberry Pi 5",
    power: "—"
  },
  {
    id: "RB-03",
    title: "SoilBus",
    subtitle: "Soil monitoring probe network",
    status: "live",
    year: "2025",
    cover: "media/rb-03-01.jpg",   // card image in the projects grid
    media: [              // shown inside the project page, in this order
      "media/rb-03-02.jpg",
      "media/rb-03-03.jpg",
      "media/rb-03-04.jpg"
    ],
    repo: "",    // e.g. "https://github.com/Saam-Grami/soilbus"
    blurb: "A self-offloading mesh network where probes auto-discover neighbors and relay data to any node, with no central hub.",
    details: "SoilBus is a self-offloading soil-monitoring mesh network built for farmers. Probes auto-discover neighboring nodes and relay sensor data to any node, so there is no central hub to install or maintain.\n\nAn LSTM processes incoming NPK, EC, pH, temperature, and moisture readings alongside light-level data across the network.\n\nI validated communication and routing across 5 physical nodes, with performance holding up to a simulated 26 nodes before degradation. Self-healing is not yet implemented.",
    stack: "C++, Arduino IDE, ad hoc networking, LSTM",
    sensors: "7-in-1 soil sensor, DHT-22, lux sensor",
    platform: "ESP32",
    power: "Battery-powered nodes"
  },
  // {
  //   id: "RB-05",
  //   title: "Robot Synthesis",
  //   subtitle: "",
  //   status: "progress",
  //   year: "2025–26",
  //   cover: "",            // e.g. "media/rb-05.jpg" — card image in the projects grid
  //   media: [],            // e.g. ["media/rb-05-01.mp4", "media/rb-05-02.jpg"]
  //   repo: "",    // e.g. "https://github.com/Saam-Grami/robot-synthesis"
  //   blurb: "TODO — one line on what this is.",
  //   details: "",
  //   stack: "",
  //   sensors: "",
  //   platform: "",
  //   power: ""
  // },
  // {
  //   id: "RB-06",
  //   title: "153s",
  //   subtitle: "",
  //   status: "live",
  //   year: "2024",
  //   cover: "",            // e.g. "media/rb-06.jpg" — card image in the projects grid
  //   media: [],            // e.g. ["media/rb-06-01.mp4", "media/rb-06-02.jpg"]
  //   repo: "",    // e.g. "https://github.com/Saam-Grami/153s"
  //   blurb: "TODO — one line on what this is.",
  //   details: "",
  //   stack: "",
  //   sensors: "",
  //   platform: "",
  //   power: ""
  // },
  {
    id: "RB-07",
    title: "PX4 Flight Stack Curriculum",
    subtitle: "Self-directed offboard control track · personal",
    status: "progress",
    year: "2026",
    cover: "media/rb-07.png",            // e.g. "media/rb-07.jpg"
    media: ["media/rb-07.mp4", "media/rb-07.png"],            // e.g. ["media/rb-07-01.mp4", "media/rb-07-02.jpg"]
    repo: "",
    blurb: "Working through a self-built PX4 and ROS2 syllabus, from offboard arming up to multi-drone collaborative SLAM on real Pixhawk hardware.",
    details: "A structured curriculum I set for myself to learn the PX4 flight stack properly rather than by copying examples. Ten core tutorials run from a first offboard node — heartbeat, arm, takeoff, hold — through waypoint navigation as a state machine, keyboard teleop, services and actions, adding a camera with its SDF and TF frames, depth and lidar height sensing, sensor fusion with robot_localization, SLAM, Nav2, and finally multi-drone collaborative mapping.\n\nEach tutorial starts with me writing the pseudocode and predicting the failure modes before touching the implementation. Tutorial 1 was largely about ordering and QoS: setpoints have to stream before arming, arming before the offboard switch, and a QoS profile mismatch with PX4 fails silently rather than erroring — which is the kind of thing you only learn by hitting it.\n\nTwo further tracks branch off the core. A custom airframe track covers sourcing and preparing a mesh, URDF, mass and inertia, rotor links, motor and propeller constants, SDF conversion, PX4 config, and first flight — then iterating on controllability, quantifying centre-of-gravity shift from a camera mount, budgeting mass for a second sensor, UWB ranging, and a leader–follower pair with role swapping, ending at the transition to real hardware. A systems track covers DDS discovery, QoS diagnostics, XRCE-DDS internals, TF debugging, Linux diagnostics, and planted-bug exercises.\n\nIsaac Sim is the bridge to real Pixhawk flight controllers rather than a separate simulator swapped in for Gazebo: its PX4 SITL integration lets the same offboard/waypoint/Nav2 stack run against photorealistic sensor models and synthetic-data pipelines, so perception trained in sim carries over to the hardware without a second retraining pass. UWB ranging follows the same path — validated in sim first, then flown on physical anchors and tags — because it's what lets the leader–follower and multi-drone SLAM tracks hold relative position without relying on GPS or vision alone. Both are treated as core to the end goal (multi-drone collaborative mapping on real airframes), not optional add-ons.\n\nOpen items I am carrying forward: waypoint motion is functional but not smooth, and teleop commands still resolve in the world frame rather than the body frame, so pressing forward after a yaw moves along world X instead of the drone's nose.",
    stack: "ROS2 Humble, PX4, C++, Python, Micro XRCE-DDS, Nav2, NVIDIA Isaac Sim",
    sensors: "RGB camera, depth camera, lidar, UWB ranging (sim-validated, hardware-bound)",
    platform: "Pixhawk, PX4 SITL, Gazebo, Isaac Sim",
    power: "—"
    
  },
  {
    id: "RB-08",
    title: "ROSbot Ambulance Follower",
    subtitle: "CNN → angular velocity · MTRE 4820 final project",
    status: "live",
    year: "2026",
    cover: "media/rb-08.png",
    media: [
      "media/rb-08.mp4",
      "media/rb-08.png"
    ],
    repo: "https://github.com/Saam-Grami/ros2-rosbot-follower-machine-learning",
    blurb: "A CNN reads the ROSbot's camera and outputs the angular velocity that curves it onto an intercept path with an ambulance.",
    details: "A convolutional network takes a single camera frame from a ROSbot in Gazebo and outputs one number: the angular velocity that steers the robot toward an ambulance in view. Forward speed is fixed at 0.5 m/s, so ω is the only command the model has to produce. Final project for Machine Learning at Kennesaw State.\n\nThe hard part was labelling. There is no ground-truth steering command in a photograph, so I derived one geometrically. The ambulance's pixel position gives a bearing through θ = arctan((x − cx) / fx), where the focal length stands in as a synthetic depth to close the triangle the camera throws away. That angle plus the two recorded world positions defines a three-point arc: robot, ambulance, and an offset midpoint pushed perpendicular to the chord by ¼·d·sin θ — the more centred the ambulance, the flatter the arc. Intersecting the perpendicular bisectors gives the circle center, R = |P1 − C| gives the radius, and ω = v / R gives the label.\n\n200 images were captured across varying ambulance positions and headings, then tripled to 600 with brightness and contrast augmentation. The model is a pretrained CNN base with frozen weights and a regression head on top, which mattered given the dataset size. Predictions track ground truth well through the middle of the range and drift at high angular velocities — those are the rarest samples, and Gazebo capture was slow enough that collecting more was the binding constraint.\n\nIn ROS2 the exported model runs inside a node that subscribes to the camera topic and publishes to /cmd_vel in a loop. The robot approaches with the ambulance off to one side, then swings to meet it head-on as it closes. Correction rate is bounded by inference speed on the host, not by the controller.",
    stack: "Python, TensorFlow, ROS2 Humble, OpenCV, NumPy, pandas",
    sensors: "RGB camera (640×480, 60° HFOV), LiDAR",
    platform: "ROSbot in Gazebo, ROS2 Humble",
    power: "—"
  }
  // {
  //   id: "RB-09",
  //   title: "Voice-Controlled Home Hub",
  //   subtitle: "",
  //   status: "progress",
  //   year: "2026",
  //   cover: "",            // e.g. "media/rb-09.jpg" — card image in the projects grid
  //   media: [],            // e.g. ["media/rb-09-01.mp4", "media/rb-09-02.jpg"]
  //   repo: "",    // e.g. "https://github.com/Saam-Grami/home-hub"
  //   blurb: "TODO — one line on what this is.",
  //   details: "",
  //   stack: "",
  //   sensors: "",
  //   platform: "",
  //   power: ""
  // }
];
