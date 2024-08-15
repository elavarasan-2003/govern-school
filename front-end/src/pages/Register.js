import React, { useState } from 'react';
import { Form, Input, Checkbox, message, Cascader,Radio,Select,DatePicker} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/RegisterStyles.css";

const{Option}=Select;

const Register = () => {

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [cities, setCities] = useState([]);

  const districtToCities = {
    Ariyalur: [' Ariyalur', 'Sendurai', 'Udayarpalayam','Andimadam'],
    Chengalpattu: ['Chengalpattu', 'Cheyyur', 'Madurantakam','Madurantakam','Tambaram','Thiruporur'],
    Chennai: ['Egmore', 'Maduravoyal', 'Mambalam','Madhavaram','Perambur','Pursawalkam','Guindy','Mylapore','Sholinganallur','Velachery'],
    Coimbatore: ['Perur', 'Madukkarai', 'Annur','Mettupalayam','Sulur','Pollachi','Anaimalai','Valparai'],
    Cuddalore: ['Chidambaram', 'Cuddalore', 'Kattumannarkoil','Panruti', 'Tittakudi','Kurinjipadi', 'Vriddachalam'],
    Dharmapuri: ['Dharmapuri', 'Harur', 'Karimangalam', 'Nallampalli', 'Palacode', 'Pappireddipatti', 'Pennagaram'],
    Dindigul: ['Athoor', 'Dindigul East', 'Dindigul West', 'Gujiliamparai',' Kodaikanal', 'Natham', 'Nilakkottai',' Oddanchatram', 'Palani', 'Vedasandur'],
    Erode: ['Erode', 'Modakurichi', 'Kodumudi', 'Perundurai', 'Bhavani', 'Anthiyur', 'Gobichettipalayam', 'Sathyamangalam', 'Thalavadi', 'Nambiyur'],
    Kallakurichi: ['Kallakkurichi', 'Sankarapuram', 'Chinnasalem', 'Ulundurpet', 'Tirukkovilur', 'Kalvarayan Hills'],
    Kancheepuram: ['Kancheepuram', 'Sriperumbudur', 'Uthiramerur', 'Walajabad', 'Kundrathur'],
    Karur: ['Karur', 'Aravakurichi','Manmangalam', 'Pugalur', 'Kulithalai', 'Krishnarayapuram', 'Kadavur'],
    Krishnagiri: ['Krishnagiri', 'Hosur', 'Pochampalli', 'Uthangarai', 'Shoolagiri', 'Bargur', 'Anchetti', 'Denkanikottai'],
    Madurai: ['Thiruparankundram', 'Peraiyur', 'Tirumangalam', 'Kalligudi', 'Sedapatti', 'Usilampatti', 'Vadipati', 'Melur'],
    Mayiladuthurai: ['Kuthalam taluk', 'Mayiladuthurai taluk',' Sirkazhi taluk', 'Tharangambadi'],
    Nagapattinam: ['Nagapattinam', 'Vedaranyam', 'Thirukuvalai', 'Kilvelur'],
    Kanniyakumari: ['Agastheeswaram', 'Kalkulam', 'Vilavan code', 'Thovala'],
    Namakkal: ['Namakkal', 'Rasipuram', 'Tiruchengode', 'Paramathi Velur', 'KolliHills', 'Sendamangalam', 'Komarapalayam', 'Mohanur'],
    Perambalur: ['Perambalur','Veppanthattai','Kunnam', 'Alathur'],
    Pudukottai: ['Kulathur', 'Illuppur', 'Gandarvakottai', 'Alangudi', 'Thirumayam', 'Aranthangi', 'Ponnamaravathi', 'Karambakudi', 'Avudaiyarkoil', 'Manamelkudi'],
    Ramanathapuram: ['Ramanathapuram', 'Rameswaram', 'Tiruvadanai', 'Keelakarai', 'Kadaladi', 'Kamuthi', 'Mudukulathur', 'Paramkudi', 'Rajasingamangalam'],
    Ranipet: ['Arcot', 'Walajah', 'Kalavai', 'Sholinghur', 'Arakkonam', 'Nemili'],
    Salem: ['Salem', 'Salem East', 'Salem West', 'Valapady', 'Attur', 'Gangavalli', 'Sankari', 'Idappadi', 'Mettur', 'Omalur',' Yercaud'],
    Sivagangai: ['CitCoonoory1', 'Natrampalli', 'City3'],
    Tenkasi: ['Tenkasi', 'Kadayanallur', 'Thiruvengadam', 'Sankarankoil', 'Shencottai', 'Veerakeralampudur', 'Alangulam', 'Sivagiri'],
    Thanjavur: ['Thanjavur', 'Kumbakonam', 'Papanasam', 'Pattukottai', 'Peravurani',' Orathanadu', 'Thiruvidaimarudur', 'Thiruvaiyaru', 'Budalur'],
    Theni: ['Theni', 'Bodinayakanur', 'Periyakulam',' Uthamapalayam', 'Andipatti'],
    Thiruvallur: ['Ambattur', 'Gummindipoondi', 'Ponneri', 'Uthukkottai', 'Tiruvallur', 'Poonamallee', 'Tiruttani', 'Pallipattu', 'Madhavaram'],
    Thoothukudi: ['Thoothukudi', 'Thiruvaikundam',' Kovilpatti', 'Ottapidaram', 'Ettayapuram', 'Vilathikulam', 'Kayathar', 'Tiruchendur'],
    Trichirappalli: ['Andanallur', 'Lalgudi', 'Thiruvarumbur', 'Thottiyam'],
    Thirunelveli: ['Tirunelveli', 'Palayamkottai', 'Ambasamudram'],
    Tiruppur: ['Tiruppur', 'Avinashi',' Dharapuram', 'Udumalaipettai', 'Uthukuli'],
    Vellore: ['Vellore', 'Katpadi', 'Anaicut','Gudiyattam'],
    Viluppuram: ['Gingee', 'Kandachipuram', 'MarakkanamVanur', 'Vikravandi'],
    Virudhunagar: ['Aruppukottai', 'Kariapatti', 'Rajapalayam', 'Sattur', 'Sivakasi', 'Srivilliputtur', 'Tiruchuli', 'Vembakottai', 'Watrap']
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setCities(districtToCities[value]);
  };



  const onFinishHandler = async (values) => {
    try {
      const formattedValues={
            Name:values.name,
            school_type:values.school_type,
            medium:values.medium,
            coed:values.coed_or_not,
            lab:values.lab,
            electricity:values.electricity,
            toilet:values.toilet,
            library:values.library,
            mid_day_meal:values.mid_day_meal,
            established_year:values.established_year,
            no_of_buildings:values.no_of_buildings,
            max_floor_height:values.max_floor_height,
            zone:values.zone,
            district:values.district,
            city:values.city,
            village:values.village,
            pincode:values.pincode,
            standard_wise_percentage:values.standard_wise_perc,
            student_teacher_ratio:values.student_teacher_ratio,
            academic_year:values.year,
            male_faculty_count:values.male_faculty_count,
            female_faculty_count:values.female_faculty_count,
            faculty_year:values.faculty_year,
            male_student_count:values.male_student_count,
            female_student_count:values.female_student_count,
            admission_2019:values.admission_2019,
            admission_2020:values.admission_2020,
            admission_2021:values.admission_2021,
            passed_2019:values.passed_2019,
            passed_2020:values.passed_2020,
            passed_2021:values.passed_2021
      };


      const res = await axios.post('/api/v1/users/register', formattedValues); // Update the API endpoint
      if (res.data.success) {
        message.success('School Registered Successfully!');
   // Navigate to a suitable page after successful registration
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };


  return (
  <div className='register-form-container'>
  <Form onFinish={onFinishHandler} className='Register-form'>
    <header class='head'>
  <h1 className='text-center'>Register School</h1>
  </header>

  {/* School Information */}
  <Form.Item label='School Name' name='name' rules={[{ required: true, message: 'School name is required' }]}>
    <Input type='text' />
  </Form.Item>
  <Form.Item label='School Type' name='school_type' rules={[{ required: true, message: 'School type is required' }]}>
    <Radio.Group className='radio-group1'>
      <Radio value='Primaary'>Primary</Radio>
      <Radio value='Elementary'>Elementary</Radio>
      <Radio value='Higher'>Higher</Radio>
    </Radio.Group>
  </Form.Item>

  <Form.Item label='Medium' name='medium' rules={[{ required: true, message: 'Medium is required' }]}>
    <Radio.Group className='radio-group2'>
      <Radio value='Tamil'>Tamil</Radio>
      <Radio value='English'>Engilsh</Radio>
    </Radio.Group>
  </Form.Item>

  {/* Blocks Information */}
  <Form.Item label='Blocks'>
          <Form.Item name='established_year' label='Established Year' >
            <DatePicker picker="year" /> {/* Use DatePicker with mode set to "year" */}
          </Form.Item>
          <Form.Item name='no_of_buildings' label='Number of Buildings' rules={[{ required: true, message: 'Number of buildings is required' }]}>
            <Select>
              {[...Array(10)].map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='max_floor_height' label='Maximum Floor Height' rules={[{ required: true, message: 'Maximum floor height is required' }]}>
            <Select>
              {[...Array(10)].map((_, index) => (
                <Option key={index + 1} value={index + 1}>
                  {index + 1}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form.Item>

  {/* Location Information */}
    <Form.Item label='Zone' name='zone' rules={[{ required: true, message: 'Zone is required' }]}>
     <Radio.Group className='radio-group3'>
      <Radio value='North'>North</Radio>
      <Radio value='East'>East</Radio>
      <Radio value='West'>West</Radio>
      <Radio value='South'>South</Radio>
     </Radio.Group>
     </Form.Item>
        <Form.Item name='district' label='District' rules={[{ required: true, message: 'District is required' }]}>
          <Select onChange={handleDistrictChange}>
            {Object.keys(districtToCities).map((district) => (
              <Option key={district} value={district}>
                {district}
              </Option>
            ))}
          </Select>
        </Form.Item>
        {selectedDistrict && (
          <Form.Item name='city' label='City' rules={[{ required: true, message: 'City is required' }]}>
            <Select>
              {cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item name='village' label='Village' rules={[{ required: true, message: 'Village is required' }]}>
          <Input type='text' />
        </Form.Item>
        <Form.Item name='pincode' label='Pincode' rules={[{ required: true, message: 'Pincode is required' }]}>
          <Input type='number' />
        </Form.Item>


  {/* Coed and Facilities Information */}
  <Form.Item label='Coed or Not' name='coed_or_not' valuePropName="checked">
    <Checkbox>Coed School</Checkbox>
  </Form.Item>

  <Form.Item label='Facilities'>
    <Form.Item name='lab' valuePropName="checked">
      <Checkbox>Lab Facility Available</Checkbox>
    </Form.Item>
    <Form.Item name='electricity' valuePropName="checked">
      <Checkbox>Electricity Available</Checkbox>
    </Form.Item>
    <Form.Item name='toilet' valuePropName="checked">
      <Checkbox>Toilet Facility Available</Checkbox>
    </Form.Item>
    <Form.Item name='library' valuePropName="checked">
      <Checkbox>Library Available</Checkbox>
    </Form.Item>
    <Form.Item name='mid_day_meal' valuePropName="checked">
      <Checkbox>Mid-day Meal Available</Checkbox>
    </Form.Item>
  </Form.Item>

  {/* Academic Score Information */}
  <Form.Item label='Academic Score'>
    <Form.Item name= 'standard_wise_perc' label='Standard-wise Percentage'>
      <Input type='text' />
    </Form.Item>
    <Form.Item name= 'student_teacher_ratio' label='Student-Teacher Ratio' rules={[{ required: true, message: 'Student-Teacher Ratio is required' }]}>
      <Input type='text' />
    </Form.Item>
    <Form.Item name='year' label='Academic Year' >
            <DatePicker picker="year" /> {/* Use DatePicker with mode set to "year" */}
    </Form.Item>
  </Form.Item>

  {/* Faculty Information */}
  <Form.Item label='Faculty'>
    <Form.Item name= 'male_faculty_count' label='Male Faculty Count'>
      <Input type='number' />
    </Form.Item>
    <Form.Item name= 'female_faculty_count' label='Female Faculty Count'>
      <Input type='number' />
    </Form.Item>
    <Form.Item name='faculty_year' label='Year' >
            <DatePicker picker="year" /> {/* Use DatePicker with mode set to "year" */}
    </Form.Item>
  </Form.Item>

  {/* Intake Information */}
  <Form.Item label='Intake'>
    <Form.Item name='male_student_count' label='Male Student Count'>
      <Input type='number' />
    </Form.Item>
    <Form.Item name='female_student_count' label='Female Student Count'>
      <Input type='number' />
    </Form.Item>
  </Form.Item>
{/* Passed Information */}
    {/* Admission Information */}
    <Form.Item label='Admission'>
    <Form.Item name='admission_2019' label='2019 Admission' rules={[{ required: true, message: '2019 Admission is required' }]}>
      <Input type='text' />
    </Form.Item>
    <Form.Item name='admission_2020' label='2020 Admission' rules={[{ required: true, message: '2020 Admission is required' }]}>
      <Input type='text' />
    </Form.Item>
    <Form.Item name='admission_2021' label='2021 Admission' rules={[{ required: true, message: '2021 Admission is required' }]}>
      <Input type='text' />
    </Form.Item>
  </Form.Item>

  {/* Passed Information */}
  <Form.Item label='Passed'>
    <Form.Item name='passed_2019' label='2019 Passed' rules={[{ required: true, message: '2019 Passed is required' }]}>
      <Input type='text' />
    </Form.Item>
    <Form.Item name='passed_2020' label='2020 Passed' rules={[{ required: true, message: '2020 Passed is required' }]}>
      <Input type='text' />
    </Form.Item>
    <Form.Item name='passed_2021' label='2021 Passed' rules={[{ required: true, message: '2021 Passed is required' }]}>
      <Input type='text' />
    </Form.Item>
  </Form.Item>

  {/* Terms and Conditions Checkbox */}
  <Form.Item name="agreement" valuePropName="checked" rules={[{ required: true, message: 'You must agree to the terms and conditions' }]}>
    <Checkbox>
      I agree to all the terms and conditions
    </Checkbox>
  </Form.Item>

  {/* Register Button */}
  <div style={{ textAlign: 'center' }}>
    <button className='btn btn-primary' type='submit'>Register</button>
  </div>

  {/* Login Link */}
  <div style={{ textAlign: 'center', marginTop: '10px' }}>
    <Link to='/'>Back to HomePage</Link>
  </div>
  </Form>


  </div>
  );
};

export default Register;
