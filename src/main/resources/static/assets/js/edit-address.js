document.addEventListener("DOMContentLoaded", function () {
    // Fetch address data and populate provinces on page load
    async function fetchAddressData() {
        try {
            const response = await fetch('/assets/data/Address.json');
            if (!response.ok) {
                throw new Error('Không thể tải dữ liệu địa chỉ');
            }
            const data = await response.json();
            populateProvinces(data);
        } catch (error) {
            console.error('Error fetching address data:', error);
        }
    }

    // Populate provinces into the select dropdown
    function populateProvinces(data) {
        const provinceSelect = document.getElementById("province");
        // Clear existing options (except the first one if it's a placeholder)
        provinceSelect.innerHTML = provinceSelect.options[0].outerHTML;

        for (const province in data) {
            const option = document.createElement("option");
            option.value = province;
            option.textContent = province;
            provinceSelect.appendChild(option);
        }
        window.addressData = data;

        // Trigger updateDistricts if a province is already selected (e.g., from Thymeleaf)
        if (provinceSelect.value && provinceSelect.value !== '') {
            updateDistricts();
        }
    }

    // Update districts based on selected province
    function updateDistricts() {
        const province = document.getElementById("province").value;
        const districts = window.addressData[province] || [];
        const districtSelect = document.getElementById("district");

        // Clear existing options (except the first one if it's a placeholder)
        districtSelect.innerHTML = districtSelect.options[0].outerHTML;

        districts.forEach(district => {
            const option = document.createElement("option");
            option.value = district;
            option.textContent = district;
            districtSelect.appendChild(option);
        });
    }

    // Add event listener for province change
    const provinceSelect = document.getElementById("province");
    provinceSelect.addEventListener("change", updateDistricts);

    // Fetch address data on page load
    fetchAddressData();
});