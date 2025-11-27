import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodserviceService {
  pastas = [
    {
      name: "SHRIMP SCAMPI",
      url: "https://unos.com/wp-content/uploads/2025/07/Pasta_ShrimpScampi_8-20_300.jpg",
      description: "Shrimp sautéed with garlic, diced tomatoes and basil in a white wine sauce on vermicelli with parmesan",
      price: 42000,
      spicy: false
    },
    {
      name: "CHICKEN SPINOCCOLI",
      url: "https://unos.com/wp-content/uploads/2025/07/Pasta_ChickenSpinoccoli_8-20_300.jpg",
      description: "Our housemade chicken roulade filled with mozzarella, feta, broccoli, spinach, tomatoes, garlic and basil, on top of penne tossed with sautéed pesto, alfredo and our chunky vine-ripened tomato sauce.",
      price: 35000,
      spicy: true
    },
    {
      name: "CHICKEN & BROCCOLI ALFREDO",
      url: "https://unos.com/wp-content/uploads/2025/07/CHICKEN_BROCCOLI_ALFREDO-min-1024x683.png",
      description: "Cavatappi, chicken and broccoli tossed in alfredo sauce topped with parmesan cheese.",
      price: 38000,
      spicy: true
    },
    {
      name: "DEEP DISH MAC & CHEESE",
      url: "https://unos.com/wp-content/uploads/2025/07/Pasta_MacCheese_8-20_300.jpg",
      description: "Ooey, gooey, cheesy goodness penne with aged cheddar and parmesan baked in a deep dish pan.",
      price: 42000,
      spicy: true
    },
    {
      name: "RATTLESNAKE PASTA",
      url: "https://unos.com/wp-content/uploads/2025/07/Pasta_Rattlesnake_8-20_300.jpg",
      description: "Sautéed chicken and spicy alfredo tossed with penne pasta and topped with cheddar and slices of jalapeño. It may just bite back.",
      price: 36000,
      spicy: true
    },
  ];


  constructor(private http: HttpClient) { }
  addPasta(name: string, url: string, desc: string, price: number, spicy: boolean) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('name', name);
    body.set('desc', desc);
    body.set('url', url);
    body.set('price', price.toString());
    body.set('spicy', spicy ? '1' : '0');
    return this.http.post("https://ubaya.cloud/hybrid/160422018/newpasta.php", body.toString(), { headers });
  }
  pastaList(): Observable<any> {
    return this.http.get("https://ubaya.cloud/hybrid/160422018/pastas.php");
  }

  pastaDetail(id: number): Observable<any> {
    return this.http.get("https://ubaya.cloud/hybrid/160422018/pasta_detail.php?id=" + id);
  }
  updatePasta(p_id: number, p_name: string, p_url: string, p_description: string, p_price: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString());
    body.set('name', p_name);
    body.set('desc', p_description);
    body.set('url', p_url);
    body.set('price', p_price.toString());
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.cloud/hybrid/160422018/update_pasta.php", urlEncodedData, { headers });
  }
  addInstruction(pasta_id: number, step: number, instruction: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    // Assumption: server endpoint is pasta_add_instruction.php and expects pasta_id, step, instruction
    body.set('pasta_id', pasta_id.toString());
    body.set('step', step.toString());
    body.set('instruction', instruction);
    const urlEncodedData = body.toString();
    return this.http.post("https://ubaya.cloud/hybrid/160422018/pasta_add_instruction.php", urlEncodedData, { headers });
  }
  deletePasta(p_id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('id', p_id.toString()); const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.cloud/hybrid/160422018/delete_pasta.php", urlEncodedData, { headers });
  }
  login(p_username: string, p_password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('username', p_username);
    body.set('password', p_password);
    const urlEncodedData = body.toString();

    return this.http.post("https://ubaya.cloud/hybrid/160422018/login.php", urlEncodedData, { headers });
  }





}
