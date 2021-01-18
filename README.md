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


# Docker + Node.js

# Run all containers
docker-compose up
<br>
# restart containers during dev
docker-compose up --force-recreate --build -d<br>
docker image prune -f<br>
docker-compose down -v<br>
<br>
# build
docker build -t <user>/nasapp:0.1 .
<br>
# run container:port8080 on pc:port5000 using image
docker run -p 5000:8080 <image-id>
<br>

# kill background nodes
taskkill -F -IM node.exe
