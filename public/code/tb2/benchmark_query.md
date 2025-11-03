```sql
SELECT 
climbs.setter_username, 
climbs.name, 
climbs.description, 
CASE
    WHEN LOWER(climbs.description) LIKE "%no%match%" THEN FALSE
    ELSE TRUE
END as matching,
climb_stats.angle, 
climbs.frames,
climb_stats.display_difficulty
FROM climbs
INNER JOIN climb_stats
on climb_stats.climb_uuid = climbs.uuid
WHERE climb_stats.benchmark_difficulty is  null --Gets non classics
AND climb_stats.ascensionist_count > 75
AND climbs.layout_id = 10
AND abs(display_difficulty - difficulty_average) < 0.5
```