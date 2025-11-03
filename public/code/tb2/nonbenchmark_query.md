```sql
-- Non Benchmark Climbs
SELECT 
climbs.setter_username, 
climbs.name, 
climbs.description, 
CASE
    WHEN LOWER(climbs.description) LIKE "%no%match%" THEN FALSE
    ELSE TRUE
END as matching, -- matching/no matching (boolean)
climb_stats.angle, -- Wall angle (float)
climbs.frames, -- Hold info (string)
climb_stats.display_difficulty -- Difficulty (float)
FROM climbs
INNER JOIN climb_stats
on climb_stats.climb_uuid = climbs.uuid
WHERE climb_stats.benchmark_difficulty is  null --Gets non classics
AND climb_stats.ascensionist_count > 75 -- High ascents
AND climbs.layout_id = 10 -- Mirror Layout
AND abs(display_difficulty - difficulty_average) < 0.5 -- Consistent set/user difficulty
```
