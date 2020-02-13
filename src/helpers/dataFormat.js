export const formatBandwidthData = initialData => {
    const cdnFormat = initialData.cdn.map(array => ({ timestamp: array[0], cdn: array[1] }));
    const p2pFormat = initialData.p2p.map(array => ({ timestamp: array[0], p2p: array[1] }));
    
    const mergedData = [...cdnFormat.concat(p2pFormat).reduce((m, o) => {
        return m.set(o.timestamp, Object.assign(m.get(o.timestamp) || {}, o))
    }, new Map()).values()];

    const formattedData = mergedData.map(array => ({
            timestamp: array.timestamp,
            cdn: array.cdn / 1073741824,
            p2p: array.p2p / 1073741824
        }
    ));

    return formattedData;
}

export const formatAudienceData = initialData => {
    const formattedData = initialData.audience.map(array => ({
        timestamp: array[0],
        viewersAmount: array[1]
    }));

    return formattedData;
}
