# About Nurse Activity Score (NAS)

“The score generated using the NAS scoring system directly expresses the percentage of time spent by the nursing staff caring for critically ill patients”<br><br>
“To optimize financial resources and to properly allocate human resources in an ICU, thus prioritizing quality and safety of care, ICU performance must be evaluated using prognostic indices and by measuring the nursing workload.”<br><br>
“The nursing workload consists of the time spent by the nursing staff to perform the activities for which they are responsible, whether directly or indirectly related to patient care.”<br><br>

[1] https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4188466/

# About me and this project

I’ve had the opportunity earlier this year to work for a Norwegian ICU with a NAS project. I designed, calculated and graphed data in excel. This could be inferred as the beta-version of this Capstone project.<br><br>
At an ICU the nurse's workload depends on a wide arrangement of events. This workload is commonly uneven, depending on hospitals, times, regions and routines. NAS (Nurse activity Score) is a proven international standard to track this phenomenon.<br><br>
The problem? ICU’s doesn’t always have access to nas-software and therefore they must dedicate a sizeable sum of time to report their numbers. This requires excessive learning and protocol for intensive care nurses who already has a stressful work-environment.<br><br>
These numbers are critical to upper-management because they can reveal latent problems and estimate the correct number of nurses required at different hospitals and regions. Preventing failure of care while maintaining humanitarian standards.<br><br>
Solution? In this project I will develop a user-friendly NAS software, where nurses can report their NAS swiftly and upper-management can receive reports in the software dashboard. It will follow the NAS-model to the point, keeping up with the required standards to provide accurate and useful reports at a real hospital. The main reports will include the overview of the recommended number of nurses at an ICU based on time, general NAS as well as patient-NAS/nurse-NAS.<br>


# Installation Guide

Make sure you have [`Docker`](https://www.docker.com/products/docker-desktop) installed and running on your device on at least version 3.0.<br>
I recommend using the Docker Desktop software to easily track all built images and running containers.

## Start Application
1. Proceed to `git clone` the nas_software repository to your local repository<br>
2. Open your favorite IDE or CMD and traverse to the nas_software folder
3. run the `docker-compose up` command to build and deploy the application to port 3000 and the API/Server to port 8080

## Stop Application
1. use the command `docker-compose down` to stop the running container<br>

## Restart Application
1. use `docker-compose up --force-recreate --build -d` to rebuild the container<br>

# System requirements recommendation
<b>Web browser:</b> Any modern browser<br>
<b>Operating system:</b> Any modern OS<br>
<b>CPU:</b> comparable to 2 vCPUs at 2.5 GHz<br>
<b>Memory:</b> 4GB for containers<br>
<b>Free space:</b> 800mb for containers, required software uses at least 10 GB<br>
<b>Graphics hardware:</b> Any

# Code Summary
<b>Name:</b> NAS_STAGE_1.js <br> 
<b>Description:</b> This component renders the NAS form which is for reporting each basic activity taken by a nurse during their shift for each patient.<br><br>
<b>Name:</b> NAS_STAGE_2.js <br> 
<b>Description:</b> Much like the NAS_STAGE_1 component, this component uses the inputs onChange events to trigger the handleChange method that changes the state of the component to match the form. A response is returned to the API that forwards it to the client and displays an alert with dynamic messages from both the API and the DB.<br> <br> 
<b>Name:</b> PeerView.js<br> 
<b>Description:</b> This Component acts as a parent component for the peer-view controllers. It uses the react-flexbox-grid react library to render each component inside dynamic flexboxes.<br> <br> 
<b>Name:</b> PeerViewStage1.j<br> 
<b>Description:</b> This Component uses the react-bootstrap-table-next library to render and edit existing patient data in the database.<br> <br> 
<b>Name:</b> PeerViewStage2.js<br> 
<b>Description:</b> The inner workings are identical to PeerViewStage1. But this one acts on Personnel data in the Stage2 DB collection.<br> <br> 
<b>Name:</b> ReportDashboard.js <br> 
<b>Description:</b> This is the parent of the dashboard components. Its task is to render the dashboard components and pass props and methods to them, allowing them to share data and variables to change their states accordingly.<br> <br> 
<b>Name:</b> DashboardMenu.js <br> 
<b>Description:</b> This components purpose is to forward the users hospital selection to the ReportDashboard component. A menu button allows the user to select between two different nested functional components that may be used to change hospital. <br> <br> 
<b>Name:</b> ReportNAS.js<br> 
<b>Description:</b> This component uses the react-chartjs-2 library to render NAS data over time in a line graph on the dashboard.<br> <br> 
<b>Name:</b> ReportPatientNAS.js <br> 
<b>Description:</b> The inner logic of this component is as described in ReportNAS with minor changes to design and data.<br> <br> 
<b>Name:</b> ReportPersonnel.js <br> 
<b>Description:</b> The inner logic of this component is as described in ReportNAS with minor changes to design and data.<br> <br> 
<b>Name:</b> ReportPatientWeights.js <br> 
<b>Description:</b> The inner logic of this component is as described in ReportNAS with minor changes to design and data.<br> <br> 
<b>Name:</b> ReportPatientPersonnelAvgPerShift.js <br> 
<b>Description:</b> The inner logic of this component is as described in ReportNAS with minor changes to design and data.<br> <br> 
<b>Name:</b> NorwayHeatMap.js<br> 
<b>Description:</b> This component is only available on the global dashboard, built using the am4chart-geodata library. it shows an overview of the average NAS for each region in Norway.<br> <br> 
<b>Name:</b> navigationBar.js<br> 
<b>Description:</b> This navigation decides what main component to render in the software based on its current route using history from react-router-dom, the standard react library for handling addresses.<br> <br> 
<b>Name:</b> LoginButton.js <br> 
<b>Description:</b> This is a standard login component from auth0’s react setup guide<br> <br> 
<b>Name:</b> LogoutButton.js <br> 
<b>Description:</b> This is a standard logout component from auth0’s react setup guide <br> <br> 
<b>Name:</b> AuthenticationButton.js<br> 
<b>Description:</b> This is a standard component from auth0’s react setup guide. It uses ternary rendering of the logout and login button<br> <br> 
<b>Name:</b> auth0-provider-with-history.js<br> 
<b>Description:</b> This is a standard wrapper component from auth0’s react authentication guide to secure the app using domain and client id. It uses auth0’s onRedirectCallback to supervise how connection are to be made to the application, allowing users to be redirected to auth0’s universal login page for authentication and then returned to the page they got redirected from.<br> <br> 
<b>Name:</b> profile.js <br> 
<b>Description:</b> This is a standard component from auth0’s react authentication guide that has been slightly modified. It simply extracts user information and displays it.<br> <br> 
<b>Name:</b> LoginPage.js <br> 
<b>Description:</b> This is a placeholder component for a hospital landing page.<br> <br>
<b>Name:</b> Footer.js <br> 
<b>Description:</b> This is a placeholder footer component for development. It will be replaced with any footer required when deployed at a hospital.<br>
<br>
For a detailed code summary, please see the attatched project report.
