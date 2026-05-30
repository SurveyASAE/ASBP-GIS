// =====================================================================================================================
// INITIAL MAP
// =====================================================================================================================

const map = L.map('map', {
    zoomControl: false
}).setView([15.0, 102.0], 13);

// =====================================================================================================================
// GOOGLE LAYERS
// =====================================================================================================================

const googleHybrid = L.tileLayer(
    'https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
    {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

const googleSatellite = L.tileLayer(
    'https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

const googleMap = L.tileLayer(
    'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    {
        maxZoom: 22,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }
);

// DEFAULT LAYER
googleHybrid.addTo(map);



// =====================================================================================================================
// Center Track LAYER
// =====================================================================================================================

const cltrackLayer = L.geoJSON(null, {
    style: {
        color: '#03ff03',
        weight: 2,
        opacity: 0.95
    },

    onEachFeature: function(feature, layer) {

        layer.bindTooltip(
            'Reference line',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function(e) {

                e.target.setStyle({
                    color: '#ffff00',
                    weight: 3,
                    opacity: 1
                });

                e.target.bringToFront();

            },

            mouseout: function(e) {

                e.target.setStyle({
                    color: '#03ff03',
                    weight: 2,
                    opacity: 0.95
                });

            }

        });

    }
});

fetch('./data/cltrack.geojson')
    .then(res => res.json())
    .then(data => {
        cltrackLayer.addData(data);
        cltrackLayer.addTo(map);
        map.fitBounds(cltrackLayer.getBounds(), { padding: [40, 40] });
    })
    .catch(err => {
        console.log('ยังไม่มี cltrack.geojson');
    });
// =====================================================================================================================
// Up&Down Track LAYER
// =====================================================================================================================

const updowntrackLayer = L.geoJSON(null, {
    style: {
        color: '#db2531',
        weight: 2,
        opacity: 0.95
    },

    onEachFeature: function(feature, layer) {

        layer.bindTooltip(
            'Up/Down track',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function(e) {

                e.target.setStyle({
                    color: '#ffff00',
                    weight: 3,
                    opacity: 1
                });

                e.target.bringToFront();

            },

            mouseout: function(e) {

                e.target.setStyle({
                    color: '#db2531',
                    weight: 2,
                    opacity: 0.95
                });

            }

        });

    }
});

fetch('./data/updowntrack.geojson')
    .then(res => res.json())
    .then(data => {
        updowntrackLayer.addData(data);
        updowntrackLayer.addTo(map);
        map.fitBounds(updowntrackLayer.getBounds(), { padding: [40, 40] });
    })
    .catch(err => {
        console.log('ยังไม่มี updowntrack.geojson');
    });
// =====================================================================================================================
// Siding Track LAYER
// =====================================================================================================================

const sidingLayer = L.geoJSON(null, {
    style: {
        color: '#ff0000',
        weight: 2,
        opacity: 0.75
    },

    onEachFeature: function(feature, layer) {

        layer.bindTooltip(
            'Siding track',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function(e) {

                e.target.setStyle({
                    color: '#ffff00',
                    weight: 3,
                    opacity: 1
                });

                e.target.bringToFront();

            },

            mouseout: function(e) {

                e.target.setStyle({
                    color: '#ff0000',
                    weight: 2,
                    opacity: 0.75
                });

            }

        });

    }
});

fetch('./data/siding.geojson')
    .then(res => res.json())
    .then(data => {
        sidingLayer.addData(data);
        sidingLayer.addTo(map);
        map.fitBounds(sidingLayer.getBounds(), { padding: [40, 40] });
    })
    .catch(err => {
        console.log('ยังไม่มี siding.geojson');
    });
// =====================================================================================================================
// ROW LAYER
// =====================================================================================================================

const areaLayer = L.geoJSON(null, {
    style: {
        color: '#1100ff',
        weight: 2,
        opacity: 0.95
    },

    onEachFeature: function(feature, layer) {

        layer.bindTooltip(
            'R.O.W.',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function(e) {

                e.target.setStyle({
                    color: '#ffff00',
                    weight: 3,
                    opacity: 1
                });

                e.target.bringToFront();

            },

            mouseout: function(e) {

                e.target.setStyle({
                    color: '#1100ff',
                    weight: 2,
                    opacity: 0.95
                });

            }

        });

    }
});

fetch('./data/area.geojson')
    .then(res => res.json())
    .then(data => {
        areaLayer.addData(data);
        areaLayer.addTo(map);
    })
    .catch(err => {
        console.log('ยังไม่มี area.geojson');
    });
// =====================================================================================================================
// Sta. LAYER เอาออกไปก่อน
// =====================================================================================================================

const chainageLayer = L.geoJSON(null, {
    pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
            radius: 4,
            color: '#ffe786',
            weight: 0.5,
            fillColor: '#fef08a',
            fillOpacity: 0.9
        });
    }
});

fetch('./data/chainage.geojson')
    .then(res => res.json())
    .then(data => {
        chainageLayer.addData(data);

    })
    .catch(err => {
        console.log('ยังไม่มี chainage.geojson');
    });
// =====================================================================================================================
// Sta. label LAYER
// =====================================================================================================================

let staValues = [];
let staSearchMarker = null;
const chainagelabelLayer = L.geoJSON(null, {

    pointToLayer: (feature, latlng) => {
        return L.circleMarker(latlng, {
            radius: 2.5,
            color: '#ff0000',
            weight: 1,
            fillColor: '#f8f8f8',
            fillOpacity: 0.9
        });
    },

    onEachFeature: (feature, layer) => {
        layer.bindTooltip(
            feature.properties.TEXTSTRING,
            {
                permanent: false,
                direction: 'top',
                offset: [0, -8],
                className: 'sta-label'
            }
        );
    }

});
fetch('./data/chainagelabel.geojson')
    .then(res => res.json())
    .then(data => {

        chainagelabelLayer.addData(data);
        chainagelabelLayer.addTo(map);
        updateStaLabels();

        // เก็บรายการ Sta.
        staValues = data.features
            .map(f => f.properties.TEXTSTRING)
            .sort((a, b) => {

                const aNum = Number(a.replace('+', ''));
                const bNum = Number(b.replace('+', ''));

                return aNum - bNum;

            });

    })
// =====================================================================================================================
/* ---------- boxunderpass ---------- */
// =====================================================================================================================
const boxunderpassLayer = L.geoJSON(null, {
    style: {
        color: '#a31ffc',      // ฟ้า
        weight: 1,
        opacity: 0.9
    }
});

fetch('./data/boxunderpass.geojson')
    .then(res => res.json())
    .then(data => {
        boxunderpassLayer.addData(data);
    })
    .catch(err => {
        console.log('ยังไม่มี boxunderpass.geojson');
    });
// =====================================================================================================================
/* ---------- overpass ---------- */
// =====================================================================================================================
const overpassLayer = L.geoJSON(null, {
    style: {
        color: '#000000',      // ม่วง
        weight: 1,
        opacity: 0.9
    }
});

fetch('./data/overpass.geojson')
    .then(res => res.json())
    .then(data => {
        overpassLayer.addData(data);
    })
    .catch(err => {
        console.log('ยังไม่มี overpass.geojson');
    });
// =====================================================================================================================
/* ---------- railwaybridge ---------- */
// =====================================================================================================================
const railwaybridgeLayer = L.geoJSON(null, {
    style: {
        color: '#d9ff00',      // ส้ม
        weight: 1,
        opacity: 0.9
    }
});

fetch('./data/railwaybridge.geojson')
    .then(res => res.json())
    .then(data => {
        railwaybridgeLayer.addData(data);
    })
    .catch(err => {
        console.log('ยังไม่มี railwaybridge.geojson');
    });
// =====================================================================================================================
/* ---------- Shoulders Sub ballast ---------- */
// =====================================================================================================================
const shouldersblLayer = L.geoJSON(null, {
    style: {
        color: '#2ff38a',      // แดง
        weight: 1,
        opacity: 0.9
    },

    onEachFeature: function(feature, layer) {

        layer.bindTooltip(
            'Shoulders Sub ballast',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function(e) {

                e.target.setStyle({
                    color: '#ffff00',
                    weight: 3,
                    opacity: 1
                });

                e.target.bringToFront();

            },

            mouseout: function(e) {

                e.target.setStyle({
                    color: '#2ff38a',
                    weight: 1,
                    opacity: 0.9
                });

            }

        });

    }
});

fetch('./data/shouldersbl.geojson')
    .then(res => res.json())
    .then(data => {
        shouldersblLayer.addData(data);
    })
    .catch(err => {
        console.log('ยังไม่มี shouldersbl.geojson');
    });
// =====================================================================================================================
/* ---------- Access&Service Road ---------- */
// =====================================================================================================================
const roadworksLayer = L.geoJSON(null, {
    style: {
        color: '#f8fc13',      // แดง
        weight: 1,
        opacity: 0.9
    }
});

fetch('./data/roadworks.geojson')
    .then(res => res.json())
    .then(data => {
        roadworksLayer.addData(data);
    })
    .catch(err => {
        console.log('ยังไม่มี roadworks.geojson');
    });
// =====================================================================================================================
/* ---------- progress ---------- */
// =====================================================================================================================
/* ---------- Sub ballast ---------- */
const subballastLayer = L.geoJSON(null, {
    style: {
        color: '#00ff95',      // สีเส้นขอบ
        weight: 0.3,
        opacity: 1,
        fillColor: '#00ff95',  // สีพื้นที่
        fillOpacity: 0.3
    },

    onEachFeature: function (feature, layer) {

        layer.bindTooltip(
            'F/N Sub ballast',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({
            mouseover: function (e) {
                e.target.setStyle({
                    fillOpacity: 0.65,
                    weight: 3
                });
            },
            mouseout: function (e) {
                subballastLayer.resetStyle(e.target);
            }
        });

    }
});

fetch('./data/subballast.geojson')
    .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
    })
    .then(data => {
        subballastLayer.addData(data);
        subballastLayer.addTo(map);
    })
    .catch(err => {
        console.error('โหลด subballast ไม่ได้:', err);
    });
// =====================================================================================================================
/* ---------- Fence ---------- */
// =====================================================================================================================

const fenceLayer = L.layerGroup();

let fenceGlowOuter, fenceGlowMiddle;

fetch('./data/fence.geojson')
    .then(res => res.json())
    .then(data => {

        // ชั้นเรืองแสงนอกสุด
        fenceGlowOuter = L.geoJSON(data, {
            style: {
                color: '#ff0000',
                weight: 12,
                opacity: 0.18
            }
        });

        // ชั้นเรืองแสงกลาง
        fenceGlowMiddle = L.geoJSON(data, {
            style: {
                color: '#ff0000',
                weight: 8,
                opacity: 0.35
            }
        });

        // เส้นหลัก
        const fenceMain = L.geoJSON(data, {
    style: {
        color: '#ff3333',
        weight: 3,
        opacity: 1,
        dashArray: '8,6'
    },

    onEachFeature: function (feature, layer) {

        layer.bindTooltip(
            'Fence',
            {
                sticky: true,
                direction: 'top',
                className: 'work-tooltip'
            }
        );

        layer.on({

            mouseover: function (e) {

                // เส้นหลักสว่างขึ้น
                e.target.setStyle({
                    color: '#ffff00',
                    weight: 6,
                    opacity: 1,
                    dashArray: '8,6'
                });

                // Glow สว่างขึ้น
                fenceGlowOuter.setStyle({
                    color: '#ffff00',
                    opacity: 0.35
                });

                fenceGlowMiddle.setStyle({
                    color: '#ffff00',
                    opacity: 0.55
                });

            },

            mouseout: function (e) {

                // คืนค่าเดิม
                e.target.setStyle({
                    color: '#ff3333',
                    weight: 3,
                    opacity: 1,
                    dashArray: '8,6'
                });

                fenceGlowOuter.setStyle({
                    color: '#ff0000',
                    opacity: 0.18
                });

                fenceGlowMiddle.setStyle({
                    color: '#ff0000',
                    opacity: 0.35
                });

            }

        });

    }
});

        fenceLayer.addLayer(fenceGlowOuter);
        fenceLayer.addLayer(fenceGlowMiddle);
        fenceLayer.addLayer(fenceMain);

        fenceLayer.addTo(map);
    });

// =====================================================================================================================
// หมุดควบคุม (BM)
// =====================================================================================================================




// =====================================================================================================================
// CUSTOM LAYER UI
// =====================================================================================================================

// Base map radio
const basemapRadios = document.querySelectorAll('input[name="basemap"]');

basemapRadios.forEach(r => {
    r.addEventListener('change', () => {
        map.removeLayer(googleHybrid);
        map.removeLayer(googleSatellite);
        map.removeLayer(googleMap);

        if (r.value === 'hybrid') googleHybrid.addTo(map);
        if (r.value === 'satellite') googleSatellite.addTo(map);
        if (r.value === 'map') googleMap.addTo(map);
    });
});



// Overlay checkbox
// 1) ดึง checkbox ทั้งหมดใน overlayControl
// =====================================================================================================================
// OVERLAY CHECKBOX CONTROL
// =====================================================================================================================

// 1) ดึง checkbox ทั้งหมดใน overlayControl
const overlayCheckboxes = document.querySelectorAll(
    '#overlayControl input[type="checkbox"], #civilControl input[type="checkbox"], #progressControl input[type="checkbox"], #surveyControl input[type="checkbox"]'
);


// 3) ผูก event เมื่อมีการเปลี่ยนค่า
overlayCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        if (cb.value === 'cltrack') {
            if (cb.checked) cltrackLayer.addTo(map);
            else map.removeLayer(cltrackLayer);
        }
        if (cb.value === 'updowntrack') {
            if (cb.checked) updowntrackLayer.addTo(map);
            else map.removeLayer(updowntrackLayer);
        }

        if (cb.value === 'siding') {
            if (cb.checked) sidingLayer.addTo(map);
            else map.removeLayer(sidingLayer);
        }

        if (cb.value === 'area') {
            if (cb.checked) areaLayer.addTo(map);
            else map.removeLayer(areaLayer);
        }

        if (cb.value === 'chainagelabel') {
            if (cb.checked) chainagelabelLayer.addTo(map);
            else map.removeLayer(chainagelabelLayer);
        }

        if (cb.value === 'boxunderpass') {
            if (cb.checked) boxunderpassLayer.addTo(map);
            else map.removeLayer(boxunderpassLayer);
        }

        if (cb.value === 'overpass') {
            if (cb.checked) overpassLayer.addTo(map);
            else map.removeLayer(overpassLayer);
        }

        if (cb.value === 'railwaybridge') {
            if (cb.checked) railwaybridgeLayer.addTo(map);
            else map.removeLayer(railwaybridgeLayer);
        }
        
        if (cb.value === 'roadworks') {
            if (cb.checked) roadworksLayer.addTo(map);
            else map.removeLayer(roadworksLayer);
        }

        if (cb.value === 'shouldersbl') {
            if (cb.checked) shouldersblLayer.addTo(map);
            else map.removeLayer(shouldersblLayer);
        }
        if (cb.value === 'subballast') {
            if (cb.checked) subballastLayer.addTo(map);
            else map.removeLayer(subballastLayer);
        }
        if (cb.value === 'fence') {
            if (cb.checked) fenceLayer.addTo(map);
            else map.removeLayer(fenceLayer);
        }
        if (cb.value === 'bm') {
            if (cb.checked) bmLayer.addTo(map);
            else map.removeLayer(bmLayer);
        }
    });
});



// Toggle dropdown เมื่อคลิกไอคอน
document.querySelectorAll('.custom-layer-control .clc-header').forEach(header => {
    header.addEventListener('click', (e) => {
        e.stopPropagation();

        const currentControl = header.parentElement;

        // ปิดกล่องอื่นทั้งหมด
        document.querySelectorAll('.custom-layer-control').forEach(control => {
            if (control !== currentControl) {
                control.classList.add('collapsed');
            }
        });

        // เปิด/ปิดกล่องที่คลิก
        currentControl.classList.toggle('collapsed');
    });
});

document.addEventListener('click', function (e) {
    if (!e.target.closest('.layer-panel')) {
        document.querySelectorAll('.custom-layer-control').forEach(control => {
            control.classList.add('collapsed');
        });
    }
});

// =====================================================================================================================
// ZOOM CONTROL
// =====================================================================================================================

L.control.zoom({
    position: 'bottomright'
}).addTo(map);

// =====================================================================================================================
// SHOW STA LABEL BY ZOOM
// =====================================================================================================================

function getStaNumber(staText) {
    return Number(staText.replace('+', ''));
}

function updateStaLabels() {

    const zoom = map.getZoom();

    chainagelabelLayer.eachLayer(layer => {

        const staText = layer.feature.properties.TEXTSTRING;
        const staNumber = getStaNumber(staText);

        layer.closeTooltip();

        // Zoom < 8 → ทุก 10 กม.
        if (zoom < 8) {

            if (staNumber % 10000 === 0) {
                layer.openTooltip();
            }

        }

        // Zoom 8-12 → ทุก 5 กม.
        else if (zoom <= 12) {

            if (staNumber % 5000 === 0) {
                layer.openTooltip();
            }

        }

        // Zoom 13-14 → ทุก 1 กม.
        else if (zoom <= 14) {

            if (staNumber % 1000 === 0) {
                layer.openTooltip();
            }

        }

        // Zoom 15-16 → ทุก 500 ม.
        else if (zoom <= 16) {

            if (staNumber % 500 === 0) {
                layer.openTooltip();
            }

        }

        // Zoom 16+ → ทุกจุด
        else {

            layer.openTooltip();

        }

    });
}

map.on('zoomend', updateStaLabels);
updateStaLabels();

// =====================================================================================================================
// SCALE
// =====================================================================================================================

L.control.scale({
    metric: true,
    imperial: false
}).addTo(map);

// =====================================================================================================================
// CLICK LATLNG + PANEL
// =====================================================================================================================

const latInfo = document.getElementById('latInfo');
const lngInfo = document.getElementById('lngInfo');
const zoomInfo = document.getElementById('zoomInfo');

if (zoomInfo) {
    zoomInfo.textContent = map.getZoom();
}

map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    if (latInfo && lngInfo) {
        latInfo.textContent = lat.toFixed(6);
        lngInfo.textContent = lng.toFixed(6);
    }
    console.log('LatLng:', e.latlng);
});

map.on('zoomend moveend', function () {
    if (zoomInfo) {
        zoomInfo.textContent = map.getZoom();
    }
});
// =====================================================================================================================
// CHECKBOX PARENT / CHILD
// =====================================================================================================================

document.querySelectorAll('input[data-group]').forEach(parentCb => {
    parentCb.addEventListener('change', () => {
        const groupName = parentCb.dataset.group;
        const childCbs = document.querySelectorAll(`input[data-parent="${groupName}"]`);

        childCbs.forEach(child => {
            child.checked = parentCb.checked;
            child.dispatchEvent(new Event('change'));
        });
    });
});
// =====================================================================================================================
// CLOSE DROPDOWN WHEN CLICK OUTSIDE
// =====================================================================================================================

document.addEventListener('click', function (e) {

    const isClickInsideLayerPanel = e.target.closest('.layer-panel');

    if (!isClickInsideLayerPanel) {
        document.querySelectorAll('.custom-layer-control').forEach(control => {
            control.classList.add('collapsed');
        });
    }

});

// =====================================================================================================================
// SEARCH STA
// =====================================================================================================================


function searchSta() {

    const input = document.getElementById('staSearchInput');
    const staValue = input.value.trim();

    if (!staValue) return;

    let foundLayer = null;

    chainagelabelLayer.eachLayer(layer => {

        const staText = layer.feature.properties.TEXTSTRING;

        if (staText === staValue) {
            foundLayer = layer;
        }

    });

    if (foundLayer) {

        const latlng = foundLayer.getLatLng();

        map.setView(latlng, 18);

        foundLayer.openTooltip();

        // ลบวงเดิม
        if (staSearchMarker) {
            map.removeLayer(staSearchMarker);
        }

        // สร้างวงใหม่
        staSearchMarker = L.circleMarker(latlng, {
            radius: 10,
            color: '#ffff00',
            weight: 3,
            fillColor: '#ffff00',
            fillOpacity: 0.35
        }).addTo(map);

    } else {

        alert('ไม่พบ Sta. ' + staValue);

    }

}

document.getElementById('staSearchBtn').addEventListener('click', searchSta);

document.getElementById('staSearchInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        searchSta();
    }
});

// คลิกที่แผนที่เพื่อลบวงค้นหา
map.on('click', function () {

    if (staSearchMarker) {

        map.removeLayer(staSearchMarker);

        staSearchMarker = null;

    }

});

// =====================================================================================================================
// STA SUGGESTION
// =====================================================================================================================

const staInput = document.getElementById('staSearchInput');
const staSuggestBox = document.getElementById('staSuggestBox');

staInput.addEventListener('input', function () {

    const keyword = staInput.value.trim();

    staSuggestBox.innerHTML = '';

    if (!keyword) {
        staSuggestBox.style.display = 'none';
        return;
    }

    const results = staValues
        .filter(sta =>
            sta.startsWith(keyword)
        )
        .slice(0, 20);

    if (results.length === 0) {
        staSuggestBox.style.display = 'none';
        return;
    }

    results.forEach(sta => {

        const item = document.createElement('div');

        item.className = 'sta-suggest-item';
        item.textContent = sta;

        item.addEventListener('click', function () {

            staInput.value = sta;
            staSuggestBox.style.display = 'none';

            searchSta();

        });

        staSuggestBox.appendChild(item);

    });

    staSuggestBox.style.display = 'block';

});

// ซ่อนรายการเมื่อคลิกที่อื่น
document.addEventListener('click', function(e){

    if (!e.target.closest('.sta-search-panel')) {

        staSuggestBox.style.display = 'none';

    }

});