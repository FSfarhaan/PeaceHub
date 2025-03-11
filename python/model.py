import pandas as pd

# Load the dataset (use the path to your dataset.csv file)
df = pd.read_csv("C:/Users/Saksh/OneDrive/Desktop/mental health/deva/dataset.csv")

# Step 1: Handle Missing Values
print("\nMissing values in each column:\n", df.isnull().sum())
df_clean = df.dropna()  # Alternatively, you can use fillna() for filling missing values

# Step 2: Check Data Types and Convert if Necessary
for i in range(1, 21):  # Columns Q1 to Q20
    df_clean[f'Q{i}'] = pd.to_numeric(df_clean[f'Q{i}'], errors='coerce')

# Step 3: Convert "Result" Column to Categorical or Numerical Labels
# Assuming "Result" has strings like 'Severe', 'Moderate', etc.
# We'll convert this to numerical labels (for ML purposes):
result_mapping = {'Severe': 2, 'Moderate': 1, 'Mild': 0}  # You can adjust mappings if needed
df_clean['Result'] = df_clean['Result'].map(result_mapping)

# Step 4: Remove Duplicates
df_clean = df_clean.drop_duplicates()

# Step 5: Handle Outliers - Ensure Q1 to Q20 are in a valid range (0 to 3)
for i in range(1, 21):  # Columns Q1 to Q20
    df_clean = df_clean[(df_clean[f'Q{i}'] >= 0) & (df_clean[f'Q{i}'] <= 3)]

# Step 6: Normalize/Standardize Data (Optional for some models)
# from sklearn.preprocessing import StandardScaler
# scaler = StandardScaler()
# df_clean[['Q1', 'Q2', ..., 'Q20']] = scaler.fit_transform(df_clean[['Q1', 'Q2', ..., 'Q20']])

# Prepare data for machine learning
X = df_clean[['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12', 'Q13', 'Q14', 'Q15', 'Q16', 'Q17', 'Q18', 'Q19', 'Q20']]  # Features (Question Responses)
y = df_clean['Result']  # Target (Depression Level)

# Save the cleaned dataset (optional)
df_clean.to_csv("C:/Users/Saksh/OneDrive/Desktop/mental health/deva/dataset_clean.csv", index=False)

print("\nCleaned dataset is saved and ready for machine learning.")
