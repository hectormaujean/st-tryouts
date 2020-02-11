import _ from 'lodash';

export const formatBandwidthData = (initialData) => {
    const cdnFormat = initialData.cdn.map(array => ({ timestamp: array[0], cdn: array[1] }));
    const p2pFormat = initialData.p2p.map(array => ({ timestamp: array[0], p2p: array[1] }));
    
    const mergedData = [...cdnFormat.concat(p2pFormat).reduce((m, o) => {
        return m.set(o.timestamp, Object.assign(m.get(o.timestamp) || {}, o))
    }, new Map()).values()];

    return mergedData;
}