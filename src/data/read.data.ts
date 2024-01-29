import axios from 'axios';

const url = 'https://raw.githubusercontent.com/PyThaiNLP/lexicon-thai/5250075f78efc4b88a563e074e46b09c9c83d5cf/swear-words/high.txt';

const profanityList: string[] = [];



// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลและเพิ่มลงใน profanityList
fetchDataAndPopulateList().then(() => {
  // ทำอะไรสักอย่างหลังจากที่ข้อมูลถูกเพิ่มลงใน profanityList
 // console.log(profanityList);
});

async function fetchData(): Promise<string[]> {
  try {
    const response = await axios.get(url);
    return [response.data];  // ปรับข้อมูลให้เป็น array หากจำเป็น
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error.message);
    throw error;
  }
}
async function fetchDataAndPopulateList() {
  try {
    const data: string[] = await fetchData();
    // เมื่อ Promise ถูก resolve, เพิ่มข้อมูลลงใน profanityList
    profanityList.push(...data);  // ใช้ spread operator เพื่อเพิ่มทีละรายการ
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error.message);
  }
}

// ตรวจสอบว่าโค้ดถูกเรียกหรือไม่
console.log('โค้ดถูกเรียก');
export default fetchData;