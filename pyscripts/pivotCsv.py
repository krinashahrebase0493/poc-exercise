import sys;
import os;
from hestia_earth.utils.table import pivot_csv

if not os.path.exists(sys.argv[3]):
    os.makedirs(sys.argv[3]);

df = pivot_csv(sys.argv[1]);
df.to_csv(sys.argv[2], index=None);
csv = df.to_csv();
print(csv);

sys.stdout.flush();