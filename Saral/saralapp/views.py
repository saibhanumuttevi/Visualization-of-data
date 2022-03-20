from django.shortcuts import render 
from django.contrib import messages
from django.core.files.storage import FileSystemStorage
import pandas as pd
import os


# Create your views here.

def index (request):
    return render(request,'index.html')

def visualization (request):
    return render(request,'visualization.html')

def filter (request):
    return render(request,'filters/filter.html')
    
def upload(request):
    loc='./static/media/'
    for x in os.listdir(loc):
        if x.endswith('.xlsx' or '.xlx'):
            os.unlink(loc+x)
    if request.method == 'POST':
        uploaded_file = request.FILES['document']  
        fs = FileSystemStorage(location=loc)
        fs.save(uploaded_file.name, uploaded_file)
        excel=pd.read_excel(loc+uploaded_file.name)
        excel.to_csv(loc+"Sample data set.csv", index=None, header=True)
        messages.success(request,"File Saved Successfully")
        messages.success(request,"Please select the Option to go through")
    return render(request,'upload/upload.html')