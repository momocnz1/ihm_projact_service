import axios from 'axios';

export let profanityList = [];
//console.log(profanityList)
// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลและเพิ่มลงใน profanityList


export async function fetchData(){
  try {
  const data = ['ตอแหล', 'อีตอแหล', 'อีดอกทอง','ดอกทอง','เหี้ย','อีเหี้ย','อีสัตว์','สัส','อีสัส',
                'เย็ดแม่','เย็ดแม่ง','เยดแม่','แม่งเยด','ควย','ไอเวร','แม่มึงตาย','พ่อมึงตาย','อีเชี้ย',
                'เชี้ย','เชี่ย','ส้นตีน','หน้าส้นตีน','แม่มึงสิ','พ่อมึงสิ','มึง','กุ','กู','มรึง','ครวย','หน้าหี',
                'หี','แตด','สันขวาน','อีสันขวาน','สันดาน','สัตว์นรก','ระยำ','อีคนเจาะถุงยางมาเกิด','ชาติชั่ว',
                'อีคนทะลุถุงยางมาเกิด','อีนรกส่งมาเกิด','กาลกิณี','พวกรกแผ่นดิน','เลว','อีเลว','บักห่า','ห่าราก',
                'ไอควาย','ปัญญาอ่อน','ไม่มีใครเก่งเท่าแม่มึงแล้วคะ','กะหรี่','อีกะหรี่','จังไร','อีจังไร','อีปอบ',
                'บักปอบ','บัดซบ','อีดอก','เสร่อ','หน้าหนังหมา','เหยดดดดด','อย่ามาเก่งกับกุนะอีปลาทอง','ตุ๊ด',
                'อย่ามาเก่งกับกูนะอีปลาทอง','เดี๋ยวมึงเจอกู','แต๋ว','ขุดทอง','น้ำปิ๊จะแตก','นปจต','ผิดเพศ','สาระแน',
                'หน้าด้าน','อีเวร','อีหอยหลอด','กี','สัสนรก','สัสนรก','ง่าว','อีหน่อแต๊ด','สถุนหมา','อีเปรต',
                'ไอเปรต','หัวควย','ปากหมา','จ้าดง่าว','ควายดง','อีควาย','อีหน้าโง่','อีแรด','ชาติหมา','ชาติเปรต',
                'เป็นป่อคิงหยัง','สลิดหมา','หน้าตัวเมีย','เวรเอ๋ย','ชั่งแม่ง','หัวดอ','อีกาก','อีขี้ข้า','แตดหมา','พ่อแม่ไม่สั่งสอน',
                'ชิบหาย','ชิปหาย','แม่ย้อย']; // ตัวอย่างข้อมูล           
                //console.log('Data fetched:', data);
                return data || [];
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error.message);
    throw error;
  }
}
export async function fetchDataAndPopulateList() {
  try {
    const data = await fetchData();
    profanityList = [...data];
    //console.log('ข้อมูลถูกเพิ่มใน profanityList');
    return profanityList; 
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error.message);
  }
}
export async function fetchdata() {
  await fetchDataAndPopulateList();
  //console.log(profanityList);
}

fetchdata();
//fetchDataAndPopulateList()
//.then(() => {
//   // ทำอะไรสักอย่างหลังจากที่ข้อมูลถูกเพิ่มลงใน profanityList
  //console.log(profanityList);
//  //console.log(fetchData);
//});

//console.log(profanityList)
//export { profanityList };
// ตรวจสอบว่าโค้ดถูกเรียกหรือไม่
//console.log('โค้ดถูกเรียก');