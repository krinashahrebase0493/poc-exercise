import sys;
import os;
from hestia_earth.utils.table import pivot_csv

df = pivot_csv(sys.argv[1]);
csv = df.to_csv();
print(csv);

sys.stdout.flush();