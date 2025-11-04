```sql
SELECT
  p.id AS placement_id,
  mp.id AS mirror_placement_id,
  h.x,
  h.y,
  ROW_NUMBER() OVER (ORDER BY p.id) - 1 AS row_num
FROM placements p
JOIN holes h ON p.hole_id = h.id
LEFT JOIN holes mh ON mh.x = -h.x AND mh.y = h.y
LEFT JOIN placements mp ON mp.hole_id = mh.id AND mp.layout_id = 10
WHERE p.layout_id = 10
ORDER BY p.id;
```