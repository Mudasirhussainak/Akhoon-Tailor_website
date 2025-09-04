 let form = document.getElementById("myForm");
    let table = document.getElementById("myTable");
    let sno = 1;
    let grandTotalCell = document.getElementById("grandTotal");
    let grandTotal = 0;


     // set current date at top
    let today = new Date();
    let dateString = today.toLocaleDateString();
    document.getElementById("date-box").innerText = "Date: " + dateString;
   
    // Handle form submission
    form.addEventListener("submit", function(event) {
      event.preventDefault();
    // take user name input and display
      let userName= document.getElementById("user-name").value;
      document.getElementById("name").innerText = "Name: " + userName;
      let name = document.getElementById("itm-name").value;
      let quantity = parseInt(document.getElementById("itm-qunty").value);
      let price = parseFloat(document.getElementById("itm-price").value);
      let total = quantity * price;

      // Insert above final row
      let row = table.insertRow(table.rows.length - 1);
      row.insertCell(0).innerText = sno;
      row.insertCell(1).innerText = name;
      row.insertCell(2).innerText = quantity;
      row.insertCell(3).innerText = price.toFixed(2);
      row.insertCell(4).innerText = total.toFixed(2);
       sno++;
      grandTotal += total;
      grandTotalCell.innerText = grandTotal.toFixed(2);


            // actions (edit button)
      let actionCell = row.insertCell(5);
      let editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.onclick = function() {
        editRow(row);
      };
      actionCell.appendChild(editBtn);
        // actions (delete button)


     
      form.reset();
    });

    // Edit row function
     function editRow(row) {
  let name = prompt("Edit Item Name:", row.cells[1].innerText);
  let quantity = prompt("Edit Quantity:", row.cells[2].innerText);
  let price = prompt("Edit Price:", row.cells[3].innerText);

  if (name !== null && quantity !== null && price !== null) {
    // update edited row
    row.cells[1].innerText = name;
    row.cells[2].innerText = quantity;
    row.cells[3].innerText = price;

    // update row total
    let rowTotal = Number(quantity) * Number(price);
    row.cells[4].innerText = rowTotal;

    // recalculate grand total from all rows
    let table = document.getElementById("myTable");
    let total = 0;

    for (let i = 1; i < table.rows.length - 1; i++) { 
      // skip header and final total row
      total += Number(table.rows[i].cells[4].innerText) || 0;
    }

    grandTotalCell.innerText = total;
  }
}


    // Download table as PNG
    function downloadPNG() {
      html2canvas(document.querySelector("#table-container")).then(canvas => {
        let link = document.createElement("a");
        link.download = "table.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    }

    // Download table as PDF
    async function downloadPDF() {
      const { jsPDF } = window.jspdf;
      const canvas = await html2canvas(document.querySelector("#table-container"));
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      let width = pdf.internal.pageSize.getWidth();
      let height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("table.pdf");
    }


    // 

    