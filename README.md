# Asset-Inventory-System-on-AWS-EC2
# Executive Summary
This project demonstrates the deployment and operational management of a cloud-hosted asset inventory system on AWS EC2. It showcases the full lifecycle of building, deploying, and maintaining a production-style application using modern cloud and DevOps practices.

This application - InventoryOS, is designed as an internal infrastructure tracking tool that allows teams to manage and monitor IT assets efficiently.

Beyond application development, the project focuses on reliability, implementing process management with PM2 and automated disaster recovery through Cron-based backups. This approach shows real-world operational environments where system uptime, resilience, and data protection are critical.

# Architectural Overview

The system follows a Monolithic Application Architecture, where the backend service handles both API operations and frontend asset delivery.

## Core Components

- **Runtime:** Node.js (V8)

- **Backend:** Express.js REST API

- **Frontend:** React 18 Single Page Application

- **Styling:** Custom CSS3 (Obsidian/DevOps Dark Mode)

- **Process Management:** PM2 (Daemonization & Resilience)

- **Cloud Infrastructure:** AWS EC2 Service

- **Automation:** Cron jobs for scheduled backups

The Express.js backend acts as both the API provider and the static file server for the React frontend, allowing the entire system to run as a unified appliance on a single EC2 instance.

# Provisioning on CLoud to Implement both Backend and Frontend

## 1. Cloud Infrastructure: 

The application is deployed on AWS EC2, where the server environment is provisioned and configured for application hosting.

## Key Infrastructure Configuration

- **Instance Type:** t3.micro (Free Tier)

- **Operating System:** Amazon Linux 2023 / Ubuntu 22.04 LTS

- **Security Configuration:**

SSH (Port 22) restricted to trusted IP addresses

Custom application port exposed for web access - Port 3000 (Custom TCP)

## Step1: Launch an EC2 Instance 

- Login to AWS Console. Type ***EC2*** in the search bar. Click on ***EC2.***

<img width="726" height="358" alt="Image" src="https://github.com/user-attachments/assets/ccc613bc-5bcd-4830-b8ca-56cdc88c381b" />

- Then click on ***Launch instance.***


<img width="930" height="756" alt="Image" src="https://github.com/user-attachments/assets/1522e08b-fd45-4bd5-bfa3-a981b5c2bf8b" />

- Name the Server and select a Machine image.


<img width="749" height="617" alt="Image" src="https://github.com/user-attachments/assets/f6b4228d-e36a-4616-9b09-e06d2b8e03c6" /> 

- Select your ***Instance type*** and create a ***new keypair***

<img width="782" height="378" alt="Image" src="https://github.com/user-attachments/assets/6e433829-0688-4efa-8db9-1fcf683b2151" /> 


<img width="603" height="597" alt="Image" src="https://github.com/user-attachments/assets/7d70082a-58a3-45f2-a330-d06066fe92ad" />


<img width="689" height="528" alt="Image" src="https://github.com/user-attachments/assets/31adaa70-46ea-48e9-89d2-d3325f85f6a8" />


- Scroll down, click on ***Launch istance*** and then click on ***View all instance"***

- Select your instance, click on ***Security,*** then ***Security groups*** 


<img width="784" height="619" alt="Image" src="https://github.com/user-attachments/assets/7981a287-6fb2-4e1b-b2d7-f0757d749e6c" />

- Click on ***Inbound rules,*** then ***Edit Inbound rules***

  
<img width="891" height="466" alt="Image" src="https://github.com/user-attachments/assets/d8154a19-d72c-419c-ac12-9906a8e7061f" />

- Click on ***Add rule.*** 

<img width="1205" height="318" alt="Image" src="https://github.com/user-attachments/assets/c32273a3-1489-4787-82e7-bcbdf4af2795" />

- Select ***Custom TCP***, enter your ***Port range,*** select ***Anywhere*** as your source and click on ***save rules.*** 


<img width="1346" height="327" alt="Image" src="https://github.com/user-attachments/assets/1d88b75c-2a4e-4b82-b73a-b19f29927105" />


<img width="1353" height="223" alt="Image" src="https://github.com/user-attachments/assets/caf1ccc9-8462-4dd1-bfeb-6d24f0c09e8c" />


## Step 2: Connect via SSH

- Click on ***Instances*** on the left side. Select your ***Instance*** click  on ***Connect***


<img width="1109" height="308" alt="Image" src="https://github.com/user-attachments/assets/847cf1fd-6915-4576-8031-808aaa349605" />

- Click on ***SSH client*** and copy the ***SSH Command***

<img width="720" height="639" alt="Image" src="https://github.com/user-attachments/assets/a889feeb-0021-4fe6-b8ad-c0a3d1d5df97" />


- Open your terminal, navigate to where you have your keypair stored.I have mine in the Downloads on my conputer. Hence:
  - ***cd Downloads,*** then paste the ***SSH command.*** Type ***Yes*** when prompt


<img width="987" height="217" alt="Image" src="https://github.com/user-attachments/assets/0c8fc2b4-678a-4b39-9df1-e92c7e8fdc2c" />


## Step 3: Prepar Environment: Install Node.js runtime

- Update all installed packages by typing in

~~~
  Sudo yum update -y
  ~~~

- Install ***Node.js*** from this website https://nodejs.org/en/download ensure you select ***Linux*** and ***NVM*** as showm below.

  <img width="820" height="547" alt="Image" src="https://github.com/user-attachments/assets/1a4f47cb-f192-4308-8369-e0b8861f4de1" />

- Copy the codes and paste on your terminal.
- Verify that node and npm is installed with the code below.

~~~
node -v
  ~~~

~~~
npm -v
  ~~~

## 2. Backend Engineering:

- Create a file called app.js. Use the code

~~~
touch app.js
~~~

- Open the file with

~~~
nano app.js
~~~

- Paste the code below in it.
  ~~~
  const express = require('express');
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.static('public')); // Serve frontend from 'public' folder by locating index.html

  // This simple app will use In-memory data in our browser to store for high-speed responsiveness
  let inventory = [
      { id: 1, name: "Cisco Catalyst 9300", qty: 2, category: "Networking" },
      { id: 2, name: "PowerEdge R750", qty: 5, category: "Servers" }
  ];

  app.get('/api/inventory', (req, res) => res.json(inventory));

  app.post('/api/inventory', (req, res) => {
      const newItem = { id: Date.now(), ...req.body };
      inventory.push(newItem);
      res.status(201).json(newItem);
  });

  app.put('/api/inventory/:id', (req, res) => {
      const { id } = req.params;
      inventory = inventory.map(item => item.id == id ? { ...item, ...req.body } : item);
      res.json({ message: "Update Successful" });
  });

  app.delete('/api/inventory/:id', (req, res) => {
      inventory = inventory.filter(item => item.id != req.params.id);
      res.status(204).send();
  });

  app.listen(PORT, '0.0.0.0', () => console.log(`InventoryOS live on port ${PORT}`));

  ~~~

- Exit with **ctrl +X, Y** and press the **Enter key.**


## 3. Frontend Engineering:

- Create a folder called public and create a file called index.html inside it.
  - create public
~~~
mkdir public
~~~
 - cd into public
~~~
cd public
~~~
  - create file index.html
~~~
touch index.html
~~~
  - Open index.html
~~~
nano index.html
~~~
  - Paste the code below.
~~~
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>InventoryOS | Pro</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        :root { --bg: #0d1117; --card: #161b22; --border: #30363d; --text: #c9d1d9; --primary: #58a6ff; --success: #238636; --danger: #f85149; }
        body { background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; margin: 0; padding: 2rem; }
        .container { max-width: 850px; margin: auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 1rem; margin-bottom: 2rem; }
        .brand { display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 1.1rem; }
        .header-actions { display: flex; align-items: center; gap: 12px; }
        .search-input { background: #010409; border: 1px solid var(--border); color: white; padding: 6px 10px 6px 30px; border-radius: 6px; width: 140px; font-size: 0.8rem; transition: 0.3s; }
        .search-input:focus { width: 190px; border-color: var(--primary); outline: none; }
        .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; margin-bottom: 1.5rem; }
        .input-group { display: flex; gap: 10px; }
        input.field { background: #010409; border: 1px solid var(--border); color: white; padding: 8px; border-radius: 6px; flex: 1; font-size: 0.85rem; }
        button { cursor: pointer; border-radius: 6px; border: none; font-weight: 600; display: flex; align-items: center; gap: 5px; padding: 8px 14px; font-size: 0.85rem; }
        .btn-add { background: var(--success); color: white; }
        .btn-export { background: transparent; color: var(--text); border: 1px solid var(--border); }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; color: #8b949e; font-size: 0.7rem; text-transform: uppercase; padding: 10px; border-bottom: 1px solid var(--border); }
        td { padding: 12px 10px; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect, useMemo } = React;
        const Icon = ({ name, size = 16 }) => {
            useEffect(() => { lucide.createIcons(); }, [name]);
            return <i data-lucide={name} style={{ width: size, height: size }}></i>;
        };

        function App() {
            const [items, setItems] = useState([]);
            const [search, setSearch] = useState('');
            const [form, setForm] = useState({ name: '', qty: '', category: '' });
            const [editingId, setEditingId] = useState(null);

            useEffect(() => { fetch('/api/inventory').then(res => res.json()).then(setItems); }, []);

            const filtered = useMemo(() => items.filter(i => i.name.toLowerCase().includes(search.toLowerCase())), [items, search]);

            const exportData = () => {
                const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url; a.download = 'inventory_backup.json'; a.click();
            };

            const handleSubmit = async (e) => {
                e.preventDefault();
                await fetch(editingId ? `/api/inventory/${editingId}` : '/api/inventory', {
                    method: editingId ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(form)
                });
                setForm({ name: '', qty: '', category: '' }); setEditingId(null);
                fetch('/api/inventory').then(res => res.json()).then(setItems);
            };

            return (
                <div className="container">
                    <header className="header">
                        <div className="brand"><Icon name="server" /> InventoryOS</div>
                        <div className="header-actions">
                            <button className="btn-export" onClick={exportData}><Icon name="download" size={14}/>Backup</button>
                            <div style={{position:'relative'}}>
                                <span style={{position:'absolute', left:'10px', top:'8px', color:'#8b949e'}}><Icon name="search" size={14}/></span>
                                <input className="search-input" placeholder="Filter..." onChange={e => setSearch(e.target.value)} />
                            </div>
                        </div>
                    </header>
                    <div className="card">
                        <form className="input-group" onSubmit={handleSubmit}>
                            <input className="field" placeholder="Item" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
                            <input className="field" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} required />
                            <input className="field" type="number" placeholder="Qty" style={{maxWidth:'60px'}} value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})} required />
                            <button className="btn-add"><Icon name="plus"/> {editingId ? 'Save' : 'Add'}</button>
                        </form>
                    </div>
                    <div className="card">
                        <table>
                            <thead><tr><th>Asset</th><th>Category</th><th>Qty</th><th style={{textAlign:'right'}}>Actions</th></tr></thead>
                            <tbody>
                                {filtered.map(i => (
                                    <tr key={i.id}>
                                        <td>{i.name}</td>
                                        <td><span style={{color:'var(--primary)', fontSize:'0.75rem'}}>{i.category}</span></td>
                                        <td>{i.qty}</td>
                                        <td style={{textAlign:'right'}}>
                                            <button style={{display:'inline', background:'none', color:'#8b949e'}} onClick={() => {setEditingId(i.id); setForm(i);}}><Icon name="edit" size={14}/></button>
                                            <button style={{display:'inline', background:'none', color:'var(--danger)'}} onClick={async () => { await fetch(`/api/inventory/${i.id}`, {method:'DELETE'}); window.location.reload(); }}><Icon name="trash" size={14}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    </script>
</body>
</html>

~~~

 - move out of public
  ~~~
  cd ..
  ~~~
Type in the code below to create package.json
~~~
npm init -y
~~~
- Then type in the code below to download and install packages.

  ~~~
  npm install
  ~~~
- Enter the code below to run the code in the file.
    ~~~
    node app.js
    ~~~
- **Note: Install **Express** before runing the above code because it will generate an error as the code in the app.js require Express to run.**

<img width="609" height="391" alt="Image" src="https://github.com/user-attachments/assets/a4443f74-d0a4-43a2-a091-306505d011e4" />

- Type in
  ~~~
  npm install express
  ~~~
- Then
  ~~~
  node app.js
  ~~~
-The result:
  
<img width="515" height="182" alt="Image" src="https://github.com/user-attachments/assets/5ae8584c-4dd0-4be0-a4db-0aafb384f31d" />

- Copy your instance Public IP address and paste on the browser. Follow the format ***Public IP address:used-port***
  eg: **18.234.84.228:3000**
  
- You should see your InventoryOS app running.
  
  <img width="892" height="419" alt="Image" src="https://github.com/user-attachments/assets/a65c1b2c-d4c5-487a-8982-3afb9ff56bf9" />

## 4. Production Orchestration: using PM2

To make sure that the app survives the **Real World**, I used **PM2**. This provide zero-downtime reloads and self-heals automaticly.
- Create a file called deploy.sh
- Paste in the script below to automate the setup on the EC2 instance.
  
  <img width="331" height="29" alt="Image" src="https://github.com/user-attachments/assets/0deaa7c8-33b5-41ba-99fb-b96f1804577f" />
  
~~~
#!/bin/bash
# Install PM2 Globally
npm install -g pm2

# Install local dependencies
npm install

# Start the application as a background daemon
pm2 start app.js --name "inventory-os"

# Configure PM2 to start on system boot
pm2 save
pm2 startup | tail -n 1 | bash

echo "✅ Deployment Successful"
~~~ 
- Make the script executable by running the code:
  
~~~
chmod +x deploy.sh
~~~
- Then,
  
~~~
./deploy.sh
~~~
<img width="498" height="548" alt="Image" src="https://github.com/user-attachments/assets/3c4dd084-75a3-4fab-8610-0ac9ccff4719" />

<img width="559" height="413" alt="Image" src="https://github.com/user-attachments/assets/66e7801d-f81c-483f-ab2a-cd50b0f06dd7" />

<img width="398" height="242" alt="Image" src="https://github.com/user-attachments/assets/b3f5f832-4e13-42e8-8e3d-1ef597209beb" />

- Check the status;
  ~~~
  pm2 status
  ~~~
  <img width="594" height="89" alt="Image" src="https://github.com/user-attachments/assets/de1d6a4f-d33f-4423-afc1-d4e289a6dfea" />
- Stop pm2 from running:
  ~~~
  pm2 stop 0
  ~~~
  <img width="577" height="122" alt="Image" src="https://github.com/user-attachments/assets/4d83c8de-61b2-4551-afb5-4c38f9f6b513" />
- When you fresh you browser, the inventoryOS connection will be cut off.

 <img width="650" height="696" alt="Image" src="https://github.com/user-attachments/assets/13faea4b-be38-4475-960f-047c4b62cb87" /> 
 - Start pm2 again, to have the inventoryOS back.
   ~~~
   pm2 start 0
   ~~~
   <img width="584" height="127" alt="Image" src="https://github.com/user-attachments/assets/a7859135-f456-4078-a0a4-991f01b90a67" />
   
## 5. Reliability Engineering with Automated Backups
- Creat a file called backup.sh
- Copy and Paste the code below:
~~~
#!/bin/bash
BACKUP_DIR="/home/ec2-user/backups"
mkdir -p $BACKUP_DIR
# Pull data from the local API
curl -s http://localhost:3000/api/inventory > "$BACKUP_DIR/inv_$(date +%F).json"
# Retention Policy: Delete backups older than 7 days
find $BACKUP_DIR -type f -mtime +7 -delete

~~~
- Exit and type in this code to make it executable
~~~
chmod +x backup.sh
~~~
- Install **crontab**.
~~~
sudo yum install cronie -y
~~~

<img width="518" height="496" alt="Image" src="https://github.com/user-attachments/assets/8ebb2bf8-8c0d-4790-8b4b-a5f33e025c37" />

- Enable and Start **Crond**.
  
  ~~~
  sudo systemctl enable crond
  ~~~
  
  ~~~
  sudo systemctl start crond
  ~~~
  
  <img width="417" height="77" alt="Image" src="https://github.com/user-attachments/assets/6965bd91-9fea-4685-bdd9-609dcb019fc7" />
  
- Then run
  
  ~~~
  crontab -e
  ~~~
  
-And add the code below to schedule time for backups

~~~
0 0 * * * /bin/bash /home/ec2-user/backup.sh
~~~

- Exit with ctrl +X, Y and press the Enter key.

This app now runs 24/7 with automated backups.

<img width="680" height="770" alt="Image" src="https://github.com/user-attachments/assets/1507093a-3492-4f1b-82f4-9504e35e37c8" />

<img width="849" height="543" alt="Image" src="https://github.com/user-attachments/assets/6704f114-5bb5-433e-a0e8-1b6dc4de377a" />

## 6 Conclusion
This deployment on AWS EC2 with PM2 and Automation Backups, demonstrate my understanding of the Reliability Pillar of the AWS Well-Architectured Framework.

## Key Takeaways

This project demonstrates the ability to:

- Deploy and operate cloud-based applications on AWS
- Implement DevOps reliability practices
- Manage application processes in production environments
- Automate operational tasks using Linux scheduling tools
- Maintain system uptime through process management and monitoring

