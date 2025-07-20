// LSC (Local Swimming Committee) data based on USA Swimming structure
// Each region (zone) contains multiple LSCs

export const regionToLSC: { [key: string]: { code: string; name: string }[] } = {
  'Eastern': [
    { code: 'AD', name: 'Adirondack Swimming' },
    { code: 'AM', name: 'Allegheny Mountain' },
    { code: 'CT', name: 'Connecticut Swimming' },
    { code: 'ME', name: 'Maine Swimming' },
    { code: 'MD', name: 'Maryland Swimming' },
    { code: 'MET', name: 'Metropolitan Swimming' },
    { code: 'MA', name: 'Middle Atlantic Swimming' },
    { code: 'NE', name: 'New England Swimming' },
    { code: 'NJ', name: 'New Jersey Swimming' },
    { code: 'NI', name: 'Niagara Swimming' },
    { code: 'PV', name: 'Potomac Valley Swimming' },
    { code: 'VA', name: 'Virginia Swimming' },
  ],
  'Southern': [
    { code: 'BOR', name: 'Border Swimming' },
    { code: 'FGC', name: 'Florida Gold Coast' },
    { code: 'FL', name: 'Florida Swimming' },
    { code: 'GA', name: 'Georgia Swimming' },
    { code: 'GULF', name: 'Gulf Swimming' },
    { code: 'KY', name: 'Kentucky Swimming' },
    { code: 'LA', name: 'Louisiana Swimming' },
    { code: 'MS', name: 'Mississippi Swimming' },
    { code: 'NC', name: 'North Carolina Swimming' },
    { code: 'NTX', name: 'North Texas Swimming' },
    { code: 'SC', name: 'South Carolina Swimming' },
    { code: 'STX', name: 'South Texas Swimming' },
    { code: 'SE', name: 'Southeastern Swimming' },
    { code: 'WTX', name: 'West Texas Swimming' },
    { code: 'WV', name: 'West Virginia Swimming' },
  ],
  'Central': [
    { code: 'AR', name: 'Arkansas Swimming' },
    { code: 'IL', name: 'Illinois Swimming' },
    { code: 'IN', name: 'Indiana Swimming' },
    { code: 'IA', name: 'Iowa Swimming' },
    { code: 'LE', name: 'Lake Erie Swimming' },
    { code: 'MI', name: 'Michigan Swimming' },
    { code: 'MW', name: 'Midwestern Swimming' },
    { code: 'MN', name: 'Minnesota Swimming' },
    { code: 'MV', name: 'Missouri Valley Swimming' },
    { code: 'ND', name: 'North Dakota Swimming' },
    { code: 'OH', name: 'Ohio Swimming' },
    { code: 'OK', name: 'Oklahoma Swimming' },
    { code: 'OZ', name: 'Ozark Swimming' },
    { code: 'SD', name: 'South Dakota Swimming' },
    { code: 'WI', name: 'Wisconsin Swimming' },
  ],
  'Western': [
    { code: 'AK', name: 'Alaska Swimming' },
    { code: 'AZ', name: 'Arizona Swimming' },
    { code: 'CC', name: 'Central California' },
    { code: 'CO', name: 'Colorado Swimming' },
    { code: 'HA', name: 'Hawaiian Swimming' },
    { code: 'IE', name: 'Inland Empire Swimming' },
    { code: 'MT', name: 'Montana Swimming' },
    { code: 'NM', name: 'New Mexico Swimming' },
    { code: 'OR', name: 'Oregon Swimming' },
    { code: 'PNW', name: 'Pacific Northwest' },
    { code: 'PC', name: 'Pacific Swimming' },
    { code: 'SDI', name: 'San Diego-Imperial' },
    { code: 'SN', name: 'Sierra Nevada Swimming' },
    { code: 'SR', name: 'Snake River Swimming' },
    { code: 'SC', name: 'Southern California' },
    { code: 'UT', name: 'Utah Swimming' },
    { code: 'WY', name: 'Wyoming Swimming' },
  ],
};

export const getAllLSCs = () => {
  const allLSCs: { code: string; name: string; region: string }[] = [];
  Object.entries(regionToLSC).forEach(([region, lscs]) => {
    lscs.forEach(lsc => {
      allLSCs.push({
        code: lsc.code,
        name: lsc.name,
        region: region
      });
    });
  });
  return allLSCs;
};

export const getLSCsByRegion = (region: string) => {
  return regionToLSC[region] || [];
}; 