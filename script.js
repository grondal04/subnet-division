function getMask(IPs) {
    let m = {};
    let x = 0;

    for (let i = 0; i <= 7; i++)
        if ((1 << i) >= IPs) {
            x = i;
            break;
        }
    console.log(x)

    let bin_mask = '';
    for (let i = 1; i <= 8 - x; i++) {
        bin_mask += '1';
    }
    for (let i = 1; i <= x; i++) {
        bin_mask += '0';
    }

    m.x = x;
    m.bit = 24 + (8 - x);
    m.mask = parseInt(bin_mask, 2);

    return m;
}

function printAllSubnet(subnetMask) {
    const results = document.getElementById('results');
    results.innerHTML = `
        <h2>Information about 192.168.1.0/${subnetMask.bit}</h2>
        <p>Subnet Mask: 255.255.255.${subnetMask.mask}</p>
        <p>Count: ${256 / (1 << subnetMask.x)}\tVolume: ${1 << subnetMask.x}</p>
    `;

    let count = 0;
    let subnetDetails = '';
    for (let i = 0; i <= 255; i += (1 << subnetMask.x)) {
        count++;
        subnetDetails += `
            <div>
                <h3>Subnet ${count}:</h3>
                <p>Network: 192.168.1.${i}/${subnetMask.bit}</p>
                <p>Broadcast: 192.168.1.${i + (1 << subnetMask.x) - 1}/${subnetMask.bit}</p>
                <p>Usable: 192.168.1.${i + 1} -> 192.168.1.${i + (1 << subnetMask.x) - 2}</p>
            </div>
        `;
    }
    results.innerHTML += subnetDetails;
}

function calculateSubnet() {
    const pcs = document.getElementById('pcs').value;

    if (pcs <= 0) {
        alert('Invalid input. Please enter a positive integer.');
        return;
    }

    const IPsRequired = parseInt(pcs) + 2; // for broadcast & network;
    const subnetMask = getMask(IPsRequired);

    printAllSubnet(subnetMask);
}
