const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const {
        companyName,
        address,
        telephoneNumber,
        faxNumber,
        emailAddress,
        websiteAddress,
        representativeName,
        representativeEmail,
        representativeDirectNumber,
        representativeMobileNumber,
        companyEstablishedDate,
        grossAnnualSales, // Expect grossAnnualSales as an object
        organizationType,
        businessType,
        employeeCount,
        branchCount,
        factoryLocation,
        plantCount,
        warehouseCount,
        authorizedSignerName,
        authorizedSignerPosition,
        authorizedSignerTelephone,
        clientReferences,
        owners,
        chiefExecutiveOfficer,
        chiefFinancialOfficer,
        bankName,
        bankAddress,
        beneficiaryName,
        bankAccountNumber,
        natureOfBusiness,
        qualityAssuranceStandard,
        certName,
        certTitle,
        certSignature,
        certDate
    } = req.body;

    // Destructure grossAnnualSales object
    const { year1, year2, year3 } = grossAnnualSales || {};

    // Ensure all required fields are present
    if (
        !companyName || !address || !telephoneNumber || !faxNumber || !emailAddress ||
        !websiteAddress || !representativeName || !representativeEmail || !representativeDirectNumber ||
        !representativeMobileNumber || !companyEstablishedDate || !year1 || !year2 || !year3 ||
        !organizationType || !businessType || !employeeCount || !branchCount || !factoryLocation ||
        !plantCount || !warehouseCount || !authorizedSignerName || !authorizedSignerPosition ||
        !authorizedSignerTelephone || !clientReferences || !owners || !chiefExecutiveOfficer ||
        !chiefFinancialOfficer || !bankName || !bankAddress || !beneficiaryName || !bankAccountNumber ||
        !natureOfBusiness || !qualityAssuranceStandard || !certName || !certTitle || !certSignature || !certDate
    ) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Prepare values array for insertion
    const values = [
        companyName,
        address,
        telephoneNumber,
        faxNumber,
        emailAddress,
        websiteAddress,
        representativeName,
        representativeEmail,
        representativeDirectNumber,
        representativeMobileNumber,
        companyEstablishedDate,
        year1,
        year2,
        year3,
        organizationType,
        businessType,
        employeeCount,
        branchCount,
        factoryLocation,
        plantCount,
        warehouseCount,
        authorizedSignerName,
        authorizedSignerPosition,
        authorizedSignerTelephone,
        JSON.stringify(clientReferences), // Convert clientReferences array to JSON
        owners,
        chiefExecutiveOfficer,
        chiefFinancialOfficer,
        bankName,
        bankAddress,
        beneficiaryName,
        bankAccountNumber,
        natureOfBusiness,
        qualityAssuranceStandard,
        certName,
        certTitle,
        certSignature,
        certDate
    ];

    try {
        // Insert data into suppliers table
        const [newSupplier] = await pool.query(
            `INSERT INTO suppliers (
                company_name, address, telephone_number, fax_number, email_address, 
                website_address, representative_name, representative_email, 
                representative_direct_number, representative_mobile_number, 
                company_established_date, gross_annual_sales_year1, gross_annual_sales_year2, gross_annual_sales_year3,
                organization_type, business_type, employee_count, branch_count, factory_location, 
                plant_count, warehouse_count, authorized_signer_name, 
                authorized_signer_position, authorized_signer_telephone, 
                client_references, owners, chief_executive_officer, 
                chief_financial_officer, bank_name, bank_address, beneficiary_name, 
                bank_account_number, nature_of_business, quality_assurance_standard, 
                cert_name, cert_title, cert_signature, cert_date
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            values
        );

        console.log("Adding supplier:", values);

        // Respond with success
        res.status(201).json({ message: 'Supplier added successfully', supplierId: newSupplier.insertId });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send('Server Error');
    }
});


//  old one not changes right now Get all suppliers
router.get('/', async (req, res) => {
    try {
        const [suppliers] = await pool.query('SELECT * FROM suppliers');
        res.json(suppliers);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
