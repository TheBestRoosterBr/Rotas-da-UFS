import math


# metodo para auxiliar a calcular a distancia em metodos de duas distancias usando longitude e latitude
def haversine(lat1, lon1, lat2, lon2):
    # Raio médio da Terra em km
    R = 6371.0

    # Converter graus para radianos
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)

    # Diferença de latitudes e longitudes
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad

    # Aplicar a fórmula de Haversine
    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Calcular a distância em km e converter para metros
    distance_km = R * c
    distance_meters = distance_km * 1000

    return distance_meters
