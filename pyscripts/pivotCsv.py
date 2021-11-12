import sys;
import os;
from hestia_earth.utils.table import pivot_csv
if not os.path.exists(sys.argv[3]):
    os.makedirs(sys.argv[3]);
try:
    df = pivot_csv(sys.argv[1]);
    df.to_csv(sys.argv[2], index=None);
    print('Converted successfully');
except:
    print('Error occured while converting');
sys.stdout.flush();