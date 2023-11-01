const add_additional = document.getElementById("add_additional");
const tableContainer = document.querySelector(".table");
let lock = true;

setInterval(function () {
  if (!lock) {
    lock = true;
  }
}, 1000);
function handleAddAdditional() {
  // lock = true;
  let table = document.querySelector("table");

  if (table) {
    const tbody = table.getElementsByTagName("tbody");
    const htmlToAppend = `
    <tr class="tab" >
      <td>${number_of_builds_per_week}</td>
      <td>${avg_build_time}</td>
      <td>${selected_machine_type}</td>
      <td><i class="fa fa-trash"></i></td>
    </tr>
  `;
    tbody[0].insertAdjacentHTML("beforeend", htmlToAppend);
  } else {
    table = document.createElement("table");

    table.innerHTML = `
    <tr >
      <th>Weekly builds</th>
      <th>Avg build time</th>
      <th>Machine type</th>
    </tr>
    <tr class="tab" >
      <td>${number_of_builds_per_week}</td>
      <td>${avg_build_time}</td>
      <td>${selected_machine_type}</td>
      <td><i class="fa fa-trash"></i></td>
    </tr>
  `;
  }
  tableContainer.appendChild(table);
  const tbody = table.getElementsByTagName("tbody");
  const tr = tbody[0].getElementsByTagName("tr");

  Array.from(tr).forEach((row, index) => {
    row.addEventListener("click", function (e) {
      if (lock && e.target.classList.contains("fa-trash")) {
        lock = false;
        const row = e.target.closest("tr");
        const values = row.querySelectorAll("td");
        console.log(values[0].textContent);
        console.log(values[1].textContent);

        const annual_hrs_saved =
          ((parseInt(values[0].textContent) *
            parseInt(values[1].textContent) *
            52) /
            60) *
          0.3;
        console.log(annual_hrs_saved);
        switch (values[2].textContent) {
          case "Linux_4_cores":
            harness_cost_per_mins = 0.01;
            circleCI_cost_per_mins = 0.012;
            github_actions_cost_per_mins = 0.016;
            harness_saving_percentage = 0.3;

            break;

          case "Linux_8_cores":
            harness_cost_per_mins = 0.025;
            circleCI_cost_per_mins = 0.06;
            github_actions_cost_per_mins = 0.032;
            harness_saving_percentage = 0.3;

            break;
          case "Linux_16_cores":
            harness_cost_per_mins = 0.05;
            circleCI_cost_per_mins = 0.012;
            github_actions_cost_per_mins = 0.064;
            harness_saving_percentage = 0.3;

            break;
          case "Linux_32_cores":
            harness_cost_per_mins = 0.1;
            circleCI_cost_per_mins = 0.18;
            github_actions_cost_per_mins = 0.128;
            harness_saving_percentage = 0.3;

            break;
          case "Windows_4_cores":
            harness_cost_per_mins = 0.04;
            circleCI_cost_per_mins = 0.072;
            github_actions_cost_per_mins = 0.064;
            harness_saving_percentage = 0.3;

            break;
          case "macOS_M1_6_cores":
            harness_cost_per_mins = 0.3;
            circleCI_cost_per_mins = 0.09;
            github_actions_cost_per_mins = 0.08;
            harness_saving_percentage = 0.2;

            break;

          default:
            break;
        }

        let cost;
        switch (selected_provider) {
          case "circleCI":
            cost = Math.round(weekly_build_minutes * circleCI_cost_per_mins);
            break;

          case "github_actions":
            cost = Math.round(
              weekly_build_minutes * github_actions_cost_per_mins
            );
            break;

          default:
            break;
        }

        removeFromArray(cost, harness_cost, annual_hrs_saved);
          if (row) {
            row.remove();
          }
      }

      if (tr.length == 1) {
        tbody[0].parentElement.remove();
      }
    });
  });
  lock = true;

  const provider = document.getElementById("provider");
  provider.addEventListener("input", function (e) {
    const tbody = table.getElementsByTagName("tbody");
    tbody[0].parentElement.remove();
  });
}

add_additional.addEventListener("click", handleAddAdditional);
