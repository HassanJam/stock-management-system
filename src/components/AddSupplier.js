import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio,Grid } from '@mui/material';
import axios from 'axios';
import api from '../api/api';

const suppliersApi = api.suppliersApi;
const AddSupplier = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        address: '',
        telephoneNumber: '',
        faxNumber: '',
        emailAddress: '',
        websiteAddress: '',
        representativeName: '',
        representativeEmail: '',
        representativeDirectNumber: '',
        representativeMobileNumber: '',
        companyEstablishedDate: '',
        grossAnnualSales: {
            year1: '',
            year2: '',
            year3: '',
        },
        organizationType: '',
        businessType: '',
        employeeCount: '',
        branchCount: '',
        factoryLocation: '',
        plantCount: '',
        warehouseCount: '',
        authorizedSignerName: '',
        authorizedSignerPosition: '',
        authorizedSignerTelephone: '',
        clientReferences: [
            { companyName: '', country: '', email: '' },
            { companyName: '', country: '', email: '' },
            { companyName: '', country: '', email: '' },
            { companyName: '', country: '', email: '' },
            { companyName: '', country: '', email: '' },
        ],
        owners: '',
        chiefExecutiveOfficer: '',
        chiefFinancialOfficer: '',
        // Section 2: Banking Information
        bankName: '',
        bankAddress: '',
        beneficiaryName: '',
        bankAccountNumber: '',
        // Section 3: Supporting Documentation
        natureOfBusiness: '',
        qualityAssuranceStandard: '',
        // Section 4: Certification
        certName: '',
        certTitle: '',
        certSignature: '',
        certDate: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleClientReferenceChange = (index, e) => {
        const { name, value } = e.target;
        const updatedReferences = [...formData.clientReferences];
        updatedReferences[index][name] = value;
        setFormData({
            ...formData,
            clientReferences: updatedReferences,
        });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(suppliersApi, formData);
            console.log(response.data);
            alert('Supplier added successfully');
        } catch (error) {
            console.error(error);
            alert('Failed to add supplier');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Add Supplier
            </Typography>
            <Card variant="outlined" sx={{ maxWidth: 900, margin: '0 auto', boxShadow: 3, borderRadius: 2, bgcolor: 'white' }}>
            <CardContent>
                    <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
            {/* Company Information */}
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name of Company"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    name="companyName"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    name="address"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Telephone Number"
                    value={formData.telephoneNumber}
                    onChange={handleInputChange}
                    name="telephoneNumber"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Fax Number"
                    value={formData.faxNumber}
                    onChange={handleInputChange}
                    name="faxNumber"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="E-mail Address"
                    value={formData.emailAddress}
                    onChange={handleInputChange}
                    name="emailAddress"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Website Address"
                    value={formData.websiteAddress}
                    onChange={handleInputChange}
                    name="websiteAddress"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name & Title of Company Representative"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                    name="representativeName"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Direct E-mail Address of Company Representative"
                    value={formData.representativeEmail}
                    onChange={handleInputChange}
                    name="representativeEmail"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Telephone Numbers of Company Representative - Direct Number"
                    value={formData.representativeDirectNumber}
                    onChange={handleInputChange}
                    name="representativeDirectNumber"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Telephone Numbers of Company Representative - Mobile Number"
                    value={formData.representativeMobileNumber}
                    onChange={handleInputChange}
                    name="representativeMobileNumber"
                    required
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Date Company Was Established"
                    value={formData.companyEstablishedDate}
                    onChange={handleInputChange}
                    name="companyEstablishedDate"
                    required
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>

            {/* Gross Annual Sales */}
            <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 3 }}>
                    Gross Annual Sales for the Last Three Years (PKR)
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Year 1"
                    value={formData.grossAnnualSales.year1}
                    onChange={handleInputChange}
                    name="grossAnnualSales.year1"
                    required
                    variant="outlined"
                    type="number"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Year 2"
                    value={formData.grossAnnualSales.year2}
                    onChange={handleInputChange}
                    name="grossAnnualSales.year2"
                    required
                    variant="outlined"
                    type="number"
                />
            </Grid>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    label="Year 3"
                    value={formData.grossAnnualSales.year3}
                    onChange={handleInputChange}
                    name="grossAnnualSales.year3"
                    required
                    variant="outlined"
                    type="number"
                />
            </Grid>

            {/* Type of Organization */}
            <Grid item xs={12}>
                <FormControl component="fieldset" sx={{ mt: 3 }} fullWidth>
                    <FormLabel component="legend">Type of Organization (Check One)</FormLabel>
                    <RadioGroup
                        value={formData.organizationType}
                        onChange={handleRadioChange}
                        name="organizationType"
                    >
                        <FormControlLabel value="Corporation" control={<Radio />} label="Corporation" />
                        <FormControlLabel value="Partnership" control={<Radio />} label="Partnership" />
                        <FormControlLabel value="Sole Proprietorship" control={<Radio />} label="Sole Proprietorship" />
                        <FormControlLabel value="Joint Venture" control={<Radio />} label="Joint Venture" />
                        <FormControlLabel value="Franchise" control={<Radio />} label="Franchise" />
                        <FormControlLabel value="Non-Profit" control={<Radio />} label="Non-Profit" />
                    </RadioGroup>
                </FormControl>
            </Grid>

            {/* Type of Business/Commodity Service */}
            <Grid item xs={12}>
                <FormControl component="fieldset" sx={{ mt: 3 }} fullWidth>
                    <FormLabel component="legend">Type of Business/Commodity Service (Check One)</FormLabel>
                    <RadioGroup
                        value={formData.businessType}
                        onChange={handleRadioChange}
                        name="businessType"
                    >
                        <FormControlLabel value="Retailer" control={<Radio />} label="Retailer" />
                        <FormControlLabel value="Publication/Broadcaster" control={<Radio />} label="Publication/Broadcaster" />
                        <FormControlLabel value="Manufacturer" control={<Radio />} label="Manufacturer" />
                        <FormControlLabel value="Wholesaler" control={<Radio />} label="Wholesaler" />
                        <FormControlLabel value="Construction Contractor" control={<Radio />} label="Construction Contractor" />
                        <FormControlLabel value="Professional Services" control={<Radio />} label="Professional Services" />
                        <FormControlLabel value="Consultant" control={<Radio />} label="Consultant" />
                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                        <FormControlLabel value="Distribution/Dealer" control={<Radio />} label="Distribution/Dealer" />
                        <FormControlLabel value="Service Provider" control={<Radio />} label="Service Provider" />
                        <FormControlLabel value="Freight/Transportation" control={<Radio />} label="Freight/Transportation" />
                    </RadioGroup>
                </FormControl>
            </Grid>
        </Grid>
        {/* New section for details on services or goods */}
        <Typography variant="h6" sx={{ mt: 3 }}>
            Details on Services or Goods Your Company Supplies
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Details on Services or Goods"
                    value={formData.detailsOnServicesOrGoods}
                    onChange={handleInputChange}
                    name="detailsOnServicesOrGoods"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
        </Grid>

        {/* New section for Officers, Owners, or Partners */}
        <Typography variant="h6" sx={{ mt: 3 }}>
            16. Name of Officers, Owners, or Partners
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Owners"
                    value={formData.owners}
                    onChange={handleInputChange}
                    name="owners"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Chief Executive Officer"
                    value={formData.chiefExecutiveOfficer}
                    onChange={handleInputChange}
                    name="chiefExecutiveOfficer"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Chief Financial Officer"
                    value={formData.chiefFinancialOfficer}
                    onChange={handleInputChange}
                    name="chiefFinancialOfficer"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
        </Grid>

        {/* SECTION 2: BANKING INFORMATION */}
        <Typography variant="h5" sx={{ mt: 3 }}>
            SECTION 2: BANKING INFORMATION
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Bank Name"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    name="bankName"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Bank Address"
                    value={formData.bankAddress}
                    onChange={handleInputChange}
                    name="bankAddress"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Beneficiary Name"
                    value={formData.beneficiaryName}
                    onChange={handleInputChange}
                    name="beneficiaryName"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Bank Account Number"
                    value={formData.bankAccountNumber}
                    onChange={handleInputChange}
                    name="bankAccountNumber"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
        </Grid>

        {/* SECTION 3: SUPPORTING DOCUMENTATION */}
        <Typography variant="h5" sx={{ mt: 3 }}>
            SECTION 3: SUPPORTING DOCUMENTATION
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Briefly write the nature of business of your Company (Please attach profile of your Co.)"
                    value={formData.natureOfBusiness}
                    onChange={handleInputChange}
                    name="natureOfBusiness"
                    required
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Please Specify your quality assurance standard"
                    value={formData.qualityAssuranceStandard}
                    onChange={handleInputChange}
                    name="qualityAssuranceStandard"
                    required
                    margin="normal"
                    variant="outlined"
                    multiline
                    rows={4}
                />
            </Grid>
        </Grid>

        {/* SECTION 4: CERTIFICATION */}
        <Typography variant="h5" sx={{ mt: 3 }}>
            SECTION 4: CERTIFICATION
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
            I, the undersigned, hereby accept the GCS (Pvt) Ltd General Terms & Conditions and warrant that the information provided in this form is correct to the best of his/her knowledge.
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Name"
                    value={formData.certName}
                    onChange={handleInputChange}
                    name="certName"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Title"
                    value={formData.certTitle}
                    onChange={handleInputChange}
                    name="certTitle"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Signature & Stamp"
                    value={formData.certSignature}
                    onChange={handleInputChange}
                    name="certSignature"
                    required
                    margin="normal"
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    fullWidth
                    label="Date"
                    value={formData.certDate}
                    onChange={handleInputChange}
                    name="certDate"
                    required
                    margin="normal"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                />
            </Grid>
        </Grid>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddSupplier;