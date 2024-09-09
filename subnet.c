#include <stdio.h>
#include <math.h>

int SUBNET_COUNT;
int SUBNET_VOLUME;

///How this program works?
//User input "PCs needed" -> return Mask

int binaryToDecimal(int n);

// 128 64 32 16 8 4 2 1
// 0   0  0   1 1 1 1 1

struct SubnetMask{
    int x;
    int bit;
    int mask;
};

struct SubnetMask getMask(int IPs) {
    struct SubnetMask m;
    int x = 0;
    int bitSum = 0;

    while (bitSum < IPs) {
        bitSum += (1 << x++); // 1 << x is equivalent to pow(2, x)
    }

    int bin_mask = 0;
    for (int i = 1; i <= 8 - x; i++) { 
        bin_mask = (bin_mask << 1) | 1; // Left shift and set the LSB to 1
    }
    bin_mask <<= x; // Shift left to place zeros

    m.x = x;
    m.bit = 24 + (8 - x);
    m.mask = binaryToDecimal(bin_mask);

    return m;
}


void print_all_subnet(struct SubnetMask subnetMask) {
    printf("\n\n*** Information about 192.168.1.0/%d ***\n", subnetMask.bit);
    printf("Subnet Mask: 255.255.255.%d\n", subnetMask.mask);
    printf("Count: %d\tVolume: %d\n\n", SUBNET_COUNT, SUBNET_VOLUME);

    int count = 0;
    for (int i = 0; i <= 255; i+= SUBNET_VOLUME) {
        count++;
        printf("Subnet %d:\n Network: 192.168.1.%d/%d\n Broadcast 192.168.1.%d/%d\n", count, i, subnetMask.bit, i+SUBNET_VOLUME-1, subnetMask.bit);
        printf("Usable: %d -> %d\n\n", i, i+SUBNET_VOLUME-1);
    }
}

int main()
{
    SUBNET_COUNT = 1;
    SUBNET_VOLUME = 256;
    printf("Default: 192.168.1.0/24\n");
    printf("Default Subnet Mask: 255.255.255.0\n");

    int PCs = 0;
    printf("How many PCs do you need?\n");

    if (scanf("%d", &PCs) != 1 || PCs <= 0) {
        fprintf(stderr, "Invalid input. Please enter a positive integer.\n");
        return 1;
    }

    int IPs_required = PCs + 2; //for broadcast & network;
    struct SubnetMask subMask = getMask(IPs_required);

    SUBNET_VOLUME = 1 << subMask.x; // Equivalent to pow(2, subMask.x)
    SUBNET_COUNT = 256 / SUBNET_VOLUME;

    print_all_subnet(subMask);

    return 0;
}


int binaryToDecimal(int n) 
{
    int dec_value = 0;
    int base = 1;

    while (n > 0) {
        dec_value += (n % 10) * base;
        n /= 10;
        base <<= 1; // Equivalent to base *= 2
    }

    return dec_value;
}
