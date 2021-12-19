<div align='center'>
  
## Ventilator Pressure Prediction
</div>

COVID-19 is still now a sophisticated problem worldwide. Patients who severly caught the disease have to use ventilator under the supervision and control from qualified medical professional. However, the mutiple rise in the number of infectious cases in some places led medical systems fall into overloading condition. Thus, building ventilator utilizing the automatically paramtric control in curing process takes a crucial role at present times. In this work, we would conduct predicting ventilator pressure based on ventilator's paramters and patients conditions throught the use of XGBoost algorithm. In addition to Deep learning techniques, XGBoost is a Machine Learning algorithm to solve supervised learning problems with a high precision and has achived itself many a winning from Kaggle's competitions in Data Mining and Machine Learning. Moreoever, XGBoost has a rapid training time and parallel computating ability due to harnessing the power from GPU.

### Table of contents
1. [Introduction](#1-introduction)
2. [Method](#2-method)
3. [Metric](#3-metric)
4. [Hyperparameters tuning](#4-hyperparameters-tuning)
5. [Results](#5-results)
6. [Demo](#6-demo)
7. [References](#7-references)
----
#### 1. Introduction 
##### Dataset
- Throughout this work, we use [Ventilator Pressure Prediction dataset from Google Brain](https://www.kaggle.com/c/ventilator-pressure-prediction).
- The ventilator data used in this competition was produced using a modified open-source ventilator connected to an artificial bellows test lung via a respiratory circuit. The diagram below illustrates the setup, with the two control inputs highlighted in green and the state variable (airway pressure) to predict in blue. The first control input is a continuous variable from 0 to 100 representing the percentage the inspiratory solenoid valve is open to let air into the lung (i.e., 0 is completely closed and no air is let in and 100 is completely open). The second control input is a binary variable representing whether the exploratory valve is open (1) or closed (0) to let air out.      

- Features in this dataset are given numerous time series of breaths and the goal is to predict the airway pressure in the respiratory circuit during the breath, given the time series of control inputs.
<div align='center'>
  <img src="https://raw.githubusercontent.com/google/deluca-lung/main/assets/2020-10-02%20Ventilator%20diagram.svg" alt="dataset">
</div>

- Each time series represents an approximately 3-second breath. The files are organized such that each row is a time step in a breath and gives the two control signals, the resulting airway pressure, and relevant attributes of the lung, described below.       

- In details:
  - `id` - globally-unique time step identifier across an entire file         
  - `breath_id` - globally-unique time step for breaths        
  - `R` - lung attribute indicating how restricted the airway is (in cmH2O/L/S). Physically, this is the change in pressure per change in flow (air volume per time). Intuitively, one can imagine blowing up a balloon through a straw. We can change R by changing the diameter of the straw, with higher R being harder to blow.         
  - `C` - lung attribute indicating how compliant the lung is (in mL/cmH2O). Physically, this is the change in volume per change in pressure. Intuitively, one can imagine the same balloon example. We can change C by changing the thickness of the balloon’s latex, with higher C having thinner latex and easier to blow.      
  - `time_step` - the actual time stamp.     
  - `u_in` - the control input for the inspiratory solenoid valve. Ranges from 0 to 100.    
  - `u_out` - the control input for the exploratory solenoid valve. Either 0 or 1.      
  - `pressure` - the airway pressure measured in the respiratory circuit, measured in cmH2O. 
  
#### 2. Method
- XGBoost, or also known as *eXtreme Gradient Boosting*, is an ML decision-tree-based ensemble algorithm. XGBoost was developed by Tianqi Chen. It is now a part of extended open-source collection and developed by Distributed Machine Learning Community. Despite the fact that Artifical Neural Network nowadays has a more outstanding performance on non-structured data, e.g. images, sounds, decision-tree-based models often have their own advantages compared to neural network models on  small and tabular data.    

- In this work, we conduct tuning XGBoost's hyperparamters to achieve a good performance on the Google Brain's dataset.
#### 3. Metric
- Through experimental process, we choose to use our metric as the Mean Absolute Error (or MAE in short). This metric is used to measure the difference between 2 continuous variables.     

- In regression problems, people use this metric to evaluate the difference between prediction model and validation set. The smaller MAE is, the better performance our algorithm has.
#### 4. Hyperparameters tuning
- We choose to use *[Grid Search method](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.GridSearchCV.html)* to choose the best parameters for XGBoost. Grid search is a hyperparameters tuning method to find the most optimal parameters set for a given problem. This is a brute force technique executed on a defined search space. Despite its easy usage, it helps us a lot in saving time, effort, and resources in finding the suitable hyperparameters.      

- After running Grid Search, we came into decision to choose the hyperparameters for XGBoost as:

<div align="center">
	
| Hyperparameters | Value |
|:---:|:---:|
| booster | 'gbtree' |  
| gamma | 3.2 |
| gpu_id | 0 |
| learning_rate | 0.1 |
| max_depth | 8 | 
| n_estimators | 5000 |
| predictor | 'gpu_predictor' |
| reg_alpha | 15.9 |
| reg_lambda | 66.1 |
| subsample | 0.95 |
| tree_method | 'gpu_hist' |
</div>

#### 5. Results
- In order to evaluate XGBoost's performance in a most effectively way, we compared the performance of XGBoost with the LightGBM and Linear Regression via the use of 5-folds cross validation.

<div align="center">
	
| Algorithm | MAE | Training time |
|:---:|:---:|:---:|
| XGBoost | 4.6240 | 148.32 |
| LightGBM | 4.7457  | 30.9537 |
| Linear Regression |  8.09 | 1.46 |
</div>

#### 6. Demo

#### 7. References
[1] Tianqi Chen and Carlos Guestrin. Xgboost.Proceedings of the 22nd ACM SIGKDD InternationalConference on Knowledge Discovery and DataMining, Aug 2016.

[2] Corinna Cortes and Vladimir Vapnik. Support-vectornetworks.Machine learning, 20(3):273–297, 1995.

[3] David R Cox. The regression analysis of binarysequences.Journal of the Royal Statistical Society:Series B (Methodological), 20(2):215–232, 1958.

[4] Anna Veronika Dorogush, Vasily Ershov, and AndreyGulin. Catboost: gradient boosting with categoricalfeatures support.arXiv preprint arXiv:1810.11363,2018.

[5] Jerome H Friedman. Greedy function approximation: agradient boosting machine.Annals of statistics, pages1189–1232, 2001.

[6] Rohan Harode. Xgboost: A deep dive into boosting,February 2020.

[7] Xinran He, Junfeng Pan, Ou Jin, Tianbing Xu, Bo Liu,Tao Xu, Yanxin Shi, Antoine Atallah, Ralf Herbrich,Stuart Bowers, and Joaquin Qui ̃nonero Candela.Practical lessons from predicting clicks on ads atfacebook. InProceedings of the Eighth InternationalWorkshop on Data Mining for Online Advertising,ADKDD’14, page 1–9, New York, NY, USA, 2014.Association for Computing Machinery.

[8] Tin Kam Ho. Random decision forests. InProceedingsof 3rd international conference on document analysisand recognition, volume 1, pages 278–282. IEEE,1995.

[9] Guolin Ke, Qi Meng, Thomas Finley, Taifeng Wang,Wei Chen, Weidong Ma, Qiwei Ye, and Tie-YanLiu. Lightgbm: A highly efficient gradient boostingdecision tree.Advances in neural informationprocessing systems, 30:3146–3154, 2017.

[10] Steven M LaValle, Michael S Branicky, and Stephen RLindemann. On the relationship between classical gridsearch and probabilistic roadmaps.The InternationalJournal of Robotics Research, 23(7-8):673–692, 2004.

[11] Ping Li. Robust logitboost and adaptive base class(abc) logitboost, 2012.

[12] Warren S McCulloch and Walter Pitts. A logicalcalculus of the ideas immanent in nervous activity.The bulletin of mathematical biophysics, 5(4):115–133, 1943.

[13] Robert E Schapire. Explaining adaboost. InEmpiricalinference, pages 37–52. Springer, 2013.

[14] Taniya. Machine learning algorithms: A comparisonof different algorithms and when to use them, May2018.

[15] Cha Zhang and Yunqian Ma. Ensemble MachineLearning: Methods and Applications. SpringerPublishing Company, Incorporated, 2012.
