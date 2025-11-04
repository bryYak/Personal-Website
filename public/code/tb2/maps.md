```py
mirror_map = dict(zip(map_df['ID'], map_df['Mirror']))
coords_map = dict(zip(map_df['ID'], list(list(t) for t in zip(map_df['H'], map_df['W']))))
encode_map = dict(zip(map_df['ID'], map_df['Row'])) 
```
