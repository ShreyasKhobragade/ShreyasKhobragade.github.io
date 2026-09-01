# SHREYAS DEVDATTA KHOBRAGADE  
Worcester, MA, USA | (774) 525-2402 | shreyasdevdattakhobragade@gmail.com | LinkedIn | GitHub | Portfolio  

---

## PROFESSIONAL SUMMARY
Robotics Engineer with an M.S. in Robotics (GPA 4.0) and 2+ years of hands-on experience designing and integrating full-stack autonomous systems, from real-time perception to closed-loop motion planning and control. Skilled in ROS2, C, C++, Python, and PyTorch for sensor fusion, 3D reconstruction, deep learning model optimization, and sim-to-real deployment on resource-constrained embedded platforms (Jetson Orin, Raspberry Pi). First-author publications at IEEE RA-L 2026 and ICRA Workshop, with experience collaborating with PIs from prototype through manuscript submission.

---

## EDUCATION

**Worcester Polytechnic Institute** — Worcester, MA  
**M.S., Robotics and Automation Engineering**, GPA: 4.0 / 4.0  
*Aug 2024 – May 2026*  
- **Awards & Honors:** Dr. Glenn Yee Graduate Student Project Award, Travel Award, EDU Bridge Scholarship  

**Visvesvaraya National Institute of Technology** — Nagpur, India  
**B.Tech., Electronics and Communication Engineering**, GPA: 8.26 / 10  
*Aug 2018 – May 2022*  

---

## WORK AND RESEARCH EXPERIENCE

### Perception and Autonomous Robotics (PeAR) Lab, WPI — Worcester, MA  
**Graduate Researcher – Aerial Autonomy, Perception, and Sim-to-Real Deployment**  
*Jul 2025 – May 2026*  
- Designed and implemented a sim-to-real autonomy pipeline for aerial robots in zero-light, GPS-denied environments, published at IEEE RA-L 2026.  
- Built a depth estimation system using structured lighting and coded apertures for obstacle avoidance in complete darkness (<1 milli-lux illumination).  
- Trained and deployed a DenseNet model using PyTorch & TensorRT, reaching 20 Hz real-time inference on Jetson Orin Nano under latency constraints.  
- Integrated perception with motion planning in a closed-loop controller, achieving a 95.5% autonomous navigation success rate in cluttered environments.  
- Fused event camera and structured-light sensing to extend obstacle detection to 6 meters in complete darkness, including thin and dark objects.  
- Boosted perception throughput to 30+ fps on Jetson Orin Nano by reimplementing the event-based pipeline in C++, enabling 7 m/s flight.  
- Engineered two custom quadrotors end-to-end, spanning mechanical design, electronics integration, and flight testing, validating both perception systems.  

---

### Jio Platforms Limited — Bengaluru, India  
**5G Software Engineer, R&D**  
*Jun 2022 – May 2024*  
- Developed and optimized high-performance C/C++ networking software in the Vector Packet Processing (VPP) framework for production 5G core systems.  
- Implemented shared-memory instrumentation for UPF statistics by modifying VPP source in C, enabling faster crash debugging and monitoring.  
- Migrated and refactored UPF components across newer VPP releases, improving system stability, performance, and maintainability.  

---

## PUBLICATIONS

- **AsterNav: Autonomous Aerial Robot Navigation in Darkness Using Passive Computation**  
  *S. Khobragade\*, D. Singh\*, N. J. Sanket*, IEEE Robotics and Automation Letters (RA-L), 2026  
- **NightSight: Passive Computation for Navigation in Dark Using Events**  
  *S. Khobragade\*, B. Vaghasiya\*, D. Singh\*, N. J. Sanket*, Neuromorphic Field Robotics Workshop, IEEE ICRA, 2026  
- **(Under Review) Dhruva: Aerial Navigation Using Coded Events**  
  *D. Singh, S. Khobragade\*, B. Vaghasiya\*, M. Bhat, N. J. Sanket*, Nature Communications, 2026  

---

## TECHNICAL PROJECTS

### Structure-from-Motion & NeRF Multi-View 3D Reconstruction  
*Jan 2025 – Mar 2025*  
- Engineered a classical Structure-from-Motion (SfM) pipeline incorporating SIFT feature matching, RANSAC 8-point fundamental matrix estimation, nonlinear PnP pose refinement (~16% error reduction), and sparse bundle adjustment using SciPy's least-squares optimizer for global consistency.  
- Trained an 8-layer NeRF model with positional encoding, reaching PSNR 28.4 on the Lego benchmark, and built a custom capture pipeline (COLMAP, Polycam, EXIF calibration, background removal) reaching PSNR 31.49 / SSIM 0.94 on self-collected physical figurine data.  

### Real-Time Motion Planning for Drones in Unknown Environments  
*Oct 2024 – Dec 2024*  
- Developed a real-time C++ motion planning framework integrating OctoMap for hierarchical global 3D occupancy mapping from simulated LiDAR point clouds across cluttered environments, and EDT3D for local collision detection via distance transforms within a small windowed region around the drone.  
- Designed a kinodynamic RRT-based planner in OMPL generating safe, efficient trajectories under vehicle dynamics, validated in Gazebo simulation using PX4 SITL bridged to ROS via MAVROS for closed-loop, collision-free navigation testing.  

### Einstein Vision: Advanced Perception Stack for Self-Driving Cars  
*Jan 2025 – May 2025*  
- Integrated object detection and tracking (YOLO, Detic), instance segmentation (Mask R-CNN), lane detection, monocular depth (Depth Anything V2), and RAFT optical flow into a unified perception pipeline on Tesla Model S footage rendered in Blender.  
- Generated high-fidelity rendered videos across 13 driving sequences, cutting perception ambiguity 15–20% via classical heuristics.  

### Learning Visual Inertial Odometry for Aerial Robots  
*Jan 2025 – May 2025*  
- Implemented a stereo MSCKF VIO pipeline in C++/Python featuring IMU state propagation, feature tracking, and EKF updates with chi-squared gating, achieving 0.091 m translation RMSE on the EuRoC benchmark for robust state estimation.  
- Developed a CNN+LSTM sensor fusion network fusing visual and IMU features, reaching 2.38m RMSE across 25 different trajectories.  

---

## TECHNICAL SKILLS

- **Perception, Computer Vision, and 3D:** Real-time Perception Pipelines, 3D Reconstruction (NeRF, Structure-from-Motion, Point Clouds, Photogrammetry), Camera Calibration and Pose Estimation, Depth Estimation (Depth-from-Defocus, Monocular), Object Detection and Tracking, Object Segmentation (YOLOv8, Detic), Optical Flow (RAFT), Event Cameras, Visual-Inertial Odometry (VIO), OpenCV, Multi-View Geometry  
- **Autonomy, Planning, and Control:** Motion and Path Planning (OMPL, RRT, OctoMap, Nav2), Manipulator Kinematics (Forward/Inverse Kinematics, DH Parameters), MoveIt, PD/PID Control (Motor Control), Closed-Loop Autonomous Navigation, Sim-to-Real Deployment, Reinforcement Learning (PPO), GPS-Denied Navigation, SLAM, EKF State Estimation, VLM, VLA, Sensor Integration and Sensor Fusion (RGB-D/RealSense, LiDAR, IMU)  
- **Software and Infrastructure:** Python, C++, C, Embedded C, MATLAB, ROS, ROS2, Linux, Docker, Git/GitHub, PyTorch, TensorFlow, TensorRT, Unit Testing, CI/CD, 32-bit Microcontrollers, RTOS, Fusion 360, Onshape, SolidWorks, Protocols: CAN, SPI, I2C, UART  
- **Robotics Stack and Simulation:** PX4 Autopilot, ArduPilot, Mavlink, Isaac Sim, Gazebo, MuJoCo, RViz, Simulink, Blender  
- **Hardware:** Jetson Orin Nano/NX, Raspberry Pi, Intel RealSense, Pixhawk Flight Controller, Arduino Uno, ESP32  
