-- Alter fsc_classifica to support decimal points
ALTER TABLE fsc_classifica 
ALTER COLUMN points TYPE numeric(10,1) USING points::numeric(10,1);
