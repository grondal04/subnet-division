function binaryToDecimal(n) {
    let dec_value = 0;
    let base = 1;

    while (n > 0) {
        dec_value += (n % 10) * base;
        n = Math.floor(n / 10);
        base <<= 1; // Equivalent to base *= 2
    }

    return dec_value;
}

function getMask(IPs) {
    let m = {};
    let x = 0;
    let bitSum = 0;

    while (bitSum < IPs) {
        bitSum += (1 << x++); // 1 << x is equivalent to pow(2, x)
    }

    let bin_mask = 0;
    for (let i = 1; i <= 8 - x; i++) {
        bin_mask = (bin_mask << 1) | 1; // Left shift and set the LSB to 1
    }
    bin_mask <<= x; // Shift left to place zeros

    m.x = x;
    m.bit = 24 + (8 - x);
    m.mask = binaryToDecimal(bin_mask);

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
