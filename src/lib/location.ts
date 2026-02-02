export type IpLocation = {
  city?: string;
  region?: string;
  country?: string;
};

const normalizeLocation = (value: string) =>
  value
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/\b(city|prefecture|ward|district|ku)\b/g, '')
    .replace(/[^a-z0-9]/g, '');

export const scoreLocationMatch = (label: string, location: IpLocation | null) => {
  if (!location) return 0;
  const labelNorm = normalizeLocation(label);
  const cityNorm = location.city ? normalizeLocation(location.city) : '';
  const regionNorm = location.region ? normalizeLocation(location.region) : '';

  if (cityNorm && (labelNorm === cityNorm || labelNorm.includes(cityNorm))) {
    return 3;
  }

  if (regionNorm && labelNorm.includes(regionNorm)) {
    return 2;
  }

  return 0;
};
