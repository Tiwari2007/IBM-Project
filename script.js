function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("show");
}

const links = document.querySelectorAll(".sidebar nav a");
const pages = document.querySelectorAll(".page");

links.forEach(link => {
  link.onclick = () => {
    links.forEach(l => l.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));
    link.classList.add("active");
    document.getElementById(link.dataset.page).classList.add("active");
    document.getElementById("sidebar").classList.remove("show");
  };
});

new Chart(barChart, {
  type: "bar",
  data: {
    labels: ["S1", "S2", "S3", "S4", "S5"],
    datasets: [{ data: [70,60,75,85,80], backgroundColor:"#1dd1a1" }]
  },
  options:{ plugins:{ legend:{display:false} } }
});

new Chart(pieChart, {
  type:"pie",
  data:{
    labels:["Quiz","Submission","Research"],
    datasets:[{ data:[30,40,30], backgroundColor:["#ff6b6b","#feca57","#1dd1a1"] }]
  }
});

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    loadGroups(data.groups);
    loadAdmin(data.administration);
  });

function loadGroups(groups) {
  const container = document.getElementById("groupsContainer");
  groups.forEach(g => {
    container.innerHTML += `
      <div class="card">
        <h3>${g.name}</h3>
        <p><strong>Role:</strong> ${g.role}</p>
        <p><strong>Members:</strong> ${g.members}</p>
        <div class="progress">
          <div class="progress-bar" style="width:${g.progress}%"></div>
        </div>
        <small>${g.progress}% completed</small>
        <ul class="list">
          <li><strong>Leader:</strong> ${g.leader}</li>
          ${g.tasks.map(t=>`<li>${t}</li>`).join("")}
        </ul>
        <button class="action-btn">View Team</button>
      </div>`;
  });
}

function loadAdmin(admin) {
  document.getElementById("adminStats").innerHTML = `
    <div class="stat-box"><h4>Users</h4><p class="big">${admin.stats.users}</p></div>
    <div class="stat-box"><h4>Courses</h4><p class="big">${admin.stats.courses}</p></div>
    <div class="stat-box"><h4>Instructors</h4><p class="big">${admin.stats.instructors}</p></div>
    <div class="stat-box"><h4>Health</h4><p class="big">${admin.stats.systemHealth}</p></div>
  `;

  admin.settings.forEach(s => {
    adminSettings.innerHTML += `
      <div class="control">
        <span>${s.name}</span>
        <input type="checkbox" ${s.enabled ? "checked" : ""}>
      </div>`;
  });

  admin.roles.forEach(r => {
    adminRoles.innerHTML += `<li>${r}</li>`;
  });
}
