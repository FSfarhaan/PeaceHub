from typing import List
from pydantic import BaseModel

class PredictRequest(BaseModel):
    responses: List[int]