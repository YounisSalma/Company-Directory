$(document).ready(function () {
  window.refreshPersonnelTable = function (
    departmentId = null,
    locationId = null
  ) {
    $.ajax({
      url: "libs/php/getAll.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ departmentId, locationId }),
      success: function (result) {
        if (result.status.name !== "ok") {
          console.error(
            "Error retrieving personnel data:",
            result.status.description
          );
          return;
        }
        var personnelTableBody = document.getElementById("personnelTableBody");
        personnelTableBody.innerHTML = "";
        var frag = document.createDocumentFragment();
        result.data.forEach(function (person) {
          if (
            (!departmentId || person.departmentID == departmentId) &&
            (!locationId || person.locationID == locationId)
          ) {
            var row = document.createElement("tr");
            var nameCell = document.createElement("td");
            nameCell.classList = "align-middle text-nowrap";
            nameCell.textContent = `${person.lastName}, ${person.firstName}`;
            row.appendChild(nameCell);
            var departmentCell = document.createElement("td");
            departmentCell.classList =
              "align-middle text-nowrap d-none d-md-table-cell";
            departmentCell.textContent = person.department;
            row.appendChild(departmentCell);
            var locationCell = document.createElement("td");
            locationCell.classList =
              "align-middle text-nowrap d-none d-md-table-cell";
            locationCell.textContent = person.location;
            row.appendChild(locationCell);
            var emailCell = document.createElement("td");
            emailCell.classList = "align-middle text-nowrap";
            emailCell.textContent = person.email;
            row.appendChild(emailCell);
            var actionsCell = document.createElement("td");
            actionsCell.classList = "align-middle text-end text-nowrap";

            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.classList = "btn btn-primary btn-sm me-2";
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", person.id);

            var editIcon = document.createElement("i");
            editIcon.classList = "fa-solid fa-pencil fa-fw";
            editButton.appendChild(editIcon);

            var deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList = "btn btn-primary btn-sm";
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute(
              "data-bs-target",
              "#deletePersonnelModal"
            );
            deleteButton.setAttribute("data-id", person.id);

            var deleteIcon = document.createElement("i");
            deleteIcon.classList = "fa-solid fa-trash fa-fw";
            deleteButton.appendChild(deleteIcon);

            actionsCell.appendChild(editButton);
            actionsCell.appendChild(deleteButton);
            row.appendChild(actionsCell);
            frag.appendChild(row);
          }
        });
        personnelTableBody.appendChild(frag);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error retrieving personnel data: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  };

  window.refreshDepartmentTable = function () {
    $.ajax({
      url: "libs/php/getAllDepartments.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        if (result.status.name !== "ok") {
          console.error(
            "Error retrieving department data:",
            result.status.description
          );
          return;
        }
        var departmentTableBody = document.getElementById(
          "departmentTableBody"
        );
        departmentTableBody.innerHTML = "";
        var frag = document.createDocumentFragment();
        result.data.forEach(function (department) {
          var row = document.createElement("tr");
          var nameCell = document.createElement("td");
          nameCell.classList = "align-middle text-nowrap";
          nameCell.textContent = department.name;
          row.appendChild(nameCell);
          var locationCell = document.createElement("td");
          locationCell.classList =
            "align-middle text-nowrap d-none d-md-table-cell";
          locationCell.textContent = department.location || "No location";
          row.appendChild(locationCell);
          var actionsCell = document.createElement("td");
          actionsCell.classList = "align-middle text-end text-nowrap";

          var editButton = document.createElement("button");
          editButton.type = "button";
          editButton.classList = "btn btn-primary btn-sm me-2";
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editDepartmentModal");
          editButton.setAttribute("data-id", department.id);

          var editIcon = document.createElement("i");
          editIcon.classList = "fa-solid fa-pencil fa-fw";
          editButton.appendChild(editIcon);

          var deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.classList = "btn btn-primary btn-sm";
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute(
            "data-bs-target",
            "#areYouSureDeleteDepartmentModal"
          );
          deleteButton.setAttribute("data-id", department.id);

          var deleteIcon = document.createElement("i");
          deleteIcon.classList = "fa-solid fa-trash fa-fw";
          deleteButton.appendChild(deleteIcon);

          actionsCell.appendChild(editButton);
          actionsCell.appendChild(deleteButton);
          row.appendChild(actionsCell);
          frag.appendChild(row);
        });
        departmentTableBody.appendChild(frag);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error retrieving department data: " + textStatus);
        console.error("Response text: " + jqXHR.responseText);
      },
    });
  };

  window.refreshLocationTable = function () {
    $.ajax({
      url: "libs/php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      success: function (result) {
        if (result.status.name !== "ok") {
          console.error(
            "Error retrieving location data:",
            result.status.description
          );
          return;
        }
        var locationTableBody = document.getElementById("locationTableBody");
        locationTableBody.innerHTML = "";
        var frag = document.createDocumentFragment();
        result.data.forEach(function (location) {
          var row = document.createElement("tr");
          var nameCell = document.createElement("td");
          nameCell.classList = "align-middle text-nowrap";
          nameCell.textContent = location.name;
          row.appendChild(nameCell);
          var actionsCell = document.createElement("td");
          actionsCell.classList = "align-middle text-end text-nowrap";

          var editButton = document.createElement("button");
          editButton.type = "button";
          editButton.classList = "btn btn-primary btn-sm me-2";
          editButton.setAttribute("data-bs-toggle", "modal");
          editButton.setAttribute("data-bs-target", "#editLocationModal");
          editButton.setAttribute("data-id", location.id);

          var editIcon = document.createElement("i");
          editIcon.classList = "fa-solid fa-pencil fa-fw";
          editButton.appendChild(editIcon);

          var deleteButton = document.createElement("button");
          deleteButton.type = "button";
          deleteButton.classList = "btn btn-primary btn-sm";
          deleteButton.setAttribute("data-bs-toggle", "modal");
          deleteButton.setAttribute(
            "data-bs-target",
            "#areYouSureDeleteLocationModal"
          );
          deleteButton.setAttribute("data-id", location.id);

          var deleteIcon = document.createElement("i");
          deleteIcon.classList = "fa-solid fa-trash fa-fw";
          deleteButton.appendChild(deleteIcon);

          actionsCell.appendChild(editButton);
          actionsCell.appendChild(deleteButton);
          row.appendChild(actionsCell);
          frag.appendChild(row);
        });
        locationTableBody.appendChild(frag);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error retrieving location data: " + textStatus);
        console.error("Response text: " + jqXHR.responseText);
      },
    });
  };

  refreshPersonnelTable();
  refreshDepartmentTable();
  refreshLocationTable();

  function showNotification(message) {
    var notification = $("<div>", {
      class: "notification",
      html: message,
    }).appendTo("body");
    setTimeout(function () {
      notification.fadeOut(function () {
        $(this).remove();
      });
    }, 2000);
  }

  function populateDepartments(locationIds, selectedDepartmentIds = []) {
    return new Promise((resolve, reject) => {
      if (!Array.isArray(locationIds)) {
        locationIds = [locationIds];
      }
      $.ajax({
        url: "libs/php/getDepartmentsByLocation.php",
        type: "POST",
        dataType: "json",
        data: {
          locationIds: locationIds,
        },
        success: function (result) {
          if (result.status.name == "ok") {
            var departmentSelect = $(
              "#editPersonnelDepartment, #addPersonnelDepartment, #filterDepartmentDropdown"
            );
            departmentSelect.empty();
            departmentSelect.append(
              $("<option>", {
                value: "",
                text: "Select a department",
                disabled: true,
                selected: true,
              })
            );
            $.each(result.data, function (index, department) {
              departmentSelect.append(
                $("<option>", {
                  value: department.id,
                  text: department.name,
                })
              );
            });
            if (selectedDepartmentIds.length > 0) {
              departmentSelect.val(selectedDepartmentIds);
            }
            departmentSelect.trigger("change");
            resolve();
          } else {
            reject("Error fetching departments: " + result.status.description);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject("Error fetching departments: " + textStatus);
        },
      });
    });
  }

  $("#editPersonnelLocation").change(function () {
    var locationIds = $(this).val();
    if (locationIds) {
      $("#editPersonnelDepartment").prop("disabled", false);
      populateDepartments(locationIds);
    } else {
      $("#editPersonnelDepartment").prop("disabled", true).empty();
    }
  });

  $("#editPersonnelModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var personnelId = button.data("id");
    if (!personnelId) {
      console.error("Personnel ID is not defined.");
      return;
    }
    $.ajax({
      url: "libs/php/getPersonnelByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: personnelId,
      },
      success: function (result) {
        if (result.status.name == "ok") {
          var personnel = result.data.personnel;
          if (personnel) {
            $("#editPersonnelEmployeeID").val(personnel.id);
            $("#editPersonnelFirstName").val(personnel.firstName);
            $("#editPersonnelLastName").val(personnel.lastName);
            $("#editPersonnelEmailAddress").val(personnel.email);
            $("#editPersonnelJobTitle").val(personnel.jobTitle);
            populateDepartmentsDropdown($("#editPersonnelDepartment")).then(
              () => {
                $("#editPersonnelDepartment")
                  .val(personnel.departmentID)
                  .trigger("change");
              }
            );
          } else {
            console.error("Personnel data is undefined");
          }
        } else {
          console.error("Error: " + result.status.description);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error fetching personnel details: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  });

  $("#addBtn").click(function () {
    $("#addPersonnelFirstName").val("");
    $("#addPersonnelLastName").val("");
    $("#addPersonnelJobTitle").val("");
    $("#addPersonnelEmailAddress").val("");
    $("#addPersonnelDepartment").empty();
    populateDepartmentsDropdown($("#addPersonnelDepartment")).then(() => {
      $("#addPersonnelDepartment").val("").trigger("change");
    });
    $("#addPersonnelModal").modal("show");
  });

  $("#addPersonnelLocation").change(function () {
    var locationIds = $(this).val();
    if (locationIds) {
      $("#addPersonnelDepartment").prop("disabled", false);
      populateDepartments(locationIds);
    } else {
      $("#addPersonnelDepartment").prop("disabled", true).empty();
    }
  });

  $("#addPersonnelForm").on("submit", function (e) {
    e.preventDefault();
    var formData = {
      firstName: $("#addPersonnelFirstName").val(),
      lastName: $("#addPersonnelLastName").val(),
      jobTitle: $("#addPersonnelJobTitle").val(),
      email: $("#addPersonnelEmailAddress").val(),
      departmentID: $("#addPersonnelDepartment").val(),
    };
    $.ajax({
      url: "libs/php/addPersonnel.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#addPersonnelModal").modal("hide");
          setTimeout(function () {
            showNotification(
              "Employee <strong>" +
                formData.firstName +
                " " +
                formData.lastName +
                "</strong> has been successfully added to the Personnel"
            );
          }, 500);
          refreshPersonnelTable();
        } else {
          showNotification("Error adding data: " + result.status.description);
          console.error("Error code: " + result.status.code);
          console.error("Error description: " + result.status.description);
          if (result.error) {
            console.error("Error details: " + result.error);
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error adding data");
        console.error("Error adding data: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  });

  function toggleAddButton() {
    $("#addBtn, #addDepartmentBtn, #addLocationBtn")
      .addClass("d-none")
      .removeClass("btn-last");
    if ($("#personnelBtn").hasClass("active")) {
      $("#addBtn").removeClass("d-none").addClass("btn-last");
    } else if ($("#departmentsBtn").hasClass("active")) {
      $("#addDepartmentBtn").removeClass("d-none").addClass("btn-last");
    } else if ($("#locationsBtn").hasClass("active")) {
      $("#addLocationBtn").removeClass("d-none").addClass("btn-last");
    }
  }

  function toggleFilterButton() {
    if ($("#personnelBtn").hasClass("active")) {
      $("#filterBtn").prop("disabled", false);
    } else {
      $("#filterBtn").prop("disabled", true);
    }
  }

  $("#personnelBtn")
    .off("click")
    .on("click", function () {
      toggleAddButton();
      toggleFilterButton();
      if (!$(this).hasClass("active")) {
        refreshPersonnelTable();
      }
    });

  $("#departmentsBtn")
    .off("click")
    .on("click", function () {
      toggleAddButton();
      toggleFilterButton();
      if (!$(this).hasClass("active")) {
        refreshDepartmentTable();
      }
    });

  $("#locationsBtn")
    .off("click")
    .on("click", function () {
      toggleAddButton();
      toggleFilterButton();
      if (!$(this).hasClass("active")) {
        refreshLocationTable();
      }
    });

  toggleFilterButton();

  $("#addDepartmentBtn").click(function () {
    $("#addDepartmentName").val("");
    $("#addDepartmentModal").modal("show");
  });

  function addDepartment(formData) {
    $.ajax({
      url: "libs/php/addDepartment.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#addDepartmentModal").modal("hide");
          refreshDepartmentTable();
          refreshLocationTable();
          setTimeout(function () {
            showNotification(
              "Department <strong>" +
                formData.name +
                "</strong> has been successfully added."
            );
          }, 500);
        } else if (result.status.code == 409) {
          showNotification("Error: " + result.status.description);
        } else {
          showNotification(
            "Error adding department: " + result.status.description
          );
          console.error("Error adding department:", result);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error adding department");
        console.error("Error adding department:", textStatus, errorThrown);
        console.error("Response text:", jqXHR.responseText);
      },
    });
  }

  $("#addDepartmentForm")
    .off("submit")
    .on("submit", function (e) {
      e.preventDefault();
      var formData = {
        name: $("#addDepartmentName").val(),
        locationID: $("#addDepartmentLocation").val(),
      };
      if (!formData.name || !formData.locationID) {
        console.error("Invalid input: Missing name or locationID");
        showNotification("Please fill in all required fields.");
        return;
      }
      $.ajax({
        url: "libs/php/addDepartment.php",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(formData),
        success: function (result) {
          if (result.status.code == 200) {
            $("#addDepartmentModal").modal("hide");
            refreshDepartmentTable();
            refreshLocationTable();
            setTimeout(function () {
              showNotification(
                "Department <strong>" +
                  formData.name +
                  "</strong> has been successfully added."
              );
            }, 500);
          } else if (result.status.code == 409) {
            showNotification("Error: " + result.status.description);
          } else {
            showNotification(
              "Error adding department: " + result.status.description
            );
            console.error("Error adding department:", result);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          showNotification("Error adding department");
          console.error("Error adding department:", textStatus, errorThrown);
          console.error("Response text:", jqXHR.responseText);
        },
      });
    });

  $("#addLocationBtn").click(function () {
    $("#addLocationName").val("");
    $("#locationDepartmentsContainer").empty();
    $("#addLocationModal").modal("show");
  });

  function populateDepartmentsDropdown(
    selectElement,
    selectedDepartmentId = ""
  ) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          if (result.status.name == "ok") {
            selectElement.empty();
            selectElement.append(
              $("<option>", {
                value: "",
                text: "Select a department",
                disabled: true,
                selected: true,
              })
            );
            $.each(result.data, function (index, department) {
              var optionText = department.name;
              if (department.inUse) {
                optionText += " (In use)";
              }
              selectElement.append(
                $("<option>", {
                  value: department.id,
                  text: optionText,
                })
              );
            });
            setTimeout(() => {
              selectElement.val(selectedDepartmentId).trigger("change");
              resolve();
            }, 100);
          } else {
            reject("Error fetching departments: " + result.status.description);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject("Error fetching departments: " + textStatus);
        },
      });
    });
  }

  $("#addLocationForm").on("submit", function (e) {
    e.preventDefault();
    var formData = {
      name: $("#addLocationName").val().trim(),
    };
    if (!formData.name) {
      console.error("Invalid input: Location name is required");
      showNotification("Please provide a valid location name.");
      return;
    }
    $.ajax({
      url: "libs/php/addLocation.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#addLocationModal").modal("hide");
          refreshLocationTable();
          setTimeout(function () {
            showNotification(
              "Location <strong>" +
                formData.name +
                "</strong> has been successfully added."
            );
          }, 500);
        } else {
          showNotification(
            "Error adding location: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error adding location");
        console.log("Error adding location: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  });

  toggleAddButton();

  $("#refreshBtn")
    .off("click")
    .on("click", function () {
      $("#searchInp").val("");
      currentFilterDepartment = "all";
      currentFilterLocation = "all";
      $("#filterDepartmentDropdown").val("all").trigger("change");
      $("#filterLocationDropdown").val("all").trigger("change");
      if ($("#personnelBtn").hasClass("active")) {
        refreshPersonnelTable();
      } else if ($("#departmentsBtn").hasClass("active")) {
        refreshDepartmentTable();
      } else {
        refreshLocationTable();
      }
    });

  $("#searchInp").off("input");

  $("#editPersonnelForm").on("submit", function (e) {
    e.preventDefault();
    var formData = {
      id: $("#editPersonnelEmployeeID").val(),
      firstName: $("#editPersonnelFirstName").val(),
      lastName: $("#editPersonnelLastName").val(),
      jobTitle: $("#editPersonnelJobTitle").val(),
      email: $("#editPersonnelEmailAddress").val(),
      departmentID: $("#editPersonnelDepartment").val(),
    };
    $.ajax({
      url: "libs/php/updatePersonnel.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#editPersonnelModal").modal("hide");
          setTimeout(function () {
            showNotification(
              "Employee <strong>" +
                formData.firstName +
                " " +
                formData.lastName +
                "</strong> has been successfully updated."
            );
          }, 500);
          refreshPersonnelTable();
        } else {
          showNotification("Error updating data: " + result.status.description);
          console.error("Error code: " + result.status.code);
          console.error("Error description: " + result.status.description);
          if (result.error) {
            console.error("Error details: " + result.error);
          }
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error updating data");
        console.error("Error updating data: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  });

  $("#deletePersonnelModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var personnelId = button.data("id");
    $.ajax({
      url: "libs/php/getPersonnelByID.php",
      type: "POST",
      dataType: "json",
      data: { id: personnelId },
      success: function (result) {
        if (result.status.name === "ok") {
          var personnel = result.data.personnel;
          if (personnel) {
            $("#deletePersonnelId").val(personnelId);
            $("#deletePersonnelMessage").html(
              `Are you sure that you want to remove the entry for <strong>${personnel.firstName} ${personnel.lastName}</strong>?`
            );
          } else {
            console.error("Personnel data is undefined");
          }
        } else {
          console.error("Error: " + result.status.description);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching personnel details: " + textStatus);
      },
    });
  });

  $("#confirmDeletePersonnelBtn").click(function () {
    var personnelId = $("#deletePersonnelId").val();
    $.ajax({
      url: "libs/php/deletePersonnel.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ id: personnelId }),
      success: function (result) {
        if (result.status.code == 200) {
          $("#deletePersonnelModal").modal("hide");
          refreshPersonnelTable();
          showNotification("Personnel deleted successfully!");
        } else {
          showNotification(
            "Error deleting personnel: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error deleting personnel");
      },
    });
  });

  $("#areYouSureDeleteDepartmentModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var departmentId = button.data("id");
    if (!departmentId) {
      return;
    }
    $.ajax({
      url: "libs/php/checkDepartmentUse.php",
      type: "POST",
      dataType: "json",
      data: { id: departmentId },
      success: function (result) {
        if (result.status.code == 200) {
          var departmentData = result.data[0];
          if (!departmentData || departmentData.personnelCount == 0) {
            $("#areYouSureDeptName").text(
              departmentData?.departmentName || "Unknown"
            );
            $("#deleteDepartmentId").val(departmentId);
            $("#areYouSureDeleteDepartmentModal").modal("show");
          } else {
            $("#cantDeleteDeptName").text(departmentData.departmentName);
            $("#personnelCount").text(departmentData.personnelCount);
            $("#cantDeleteDepartmentModal").modal("show");
          }
        } else {
          console.error(
            "Error retrieving department dependencies:",
            result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error checking department dependencies:", textStatus);
      },
    });
    event.preventDefault();
  });

  $("#areYouSureDeleteDepartmentModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var departmentId = button.data("id");
    $("#deleteDepartmentId").val(departmentId);
  });

  $("#confirmDeleteDepartmentBtn").click(function () {
    var departmentId = $("#deleteDepartmentId").val();
    $.ajax({
      url: "libs/php/deleteDepartment.php",
      type: "POST",
      dataType: "json",
      data: { id: departmentId },
      success: function (result) {
        if (result.status.code == 200) {
          $("#areYouSureDeleteDepartmentModal").modal("hide");
          refreshDepartmentTable();
          showNotification("Department deleted successfully!");
        } else {
          showNotification(
            "Error deleting department: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error deleting department");
      },
    });
  });

  $("#areYouSureDeleteLocationModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var locationId = button.data("id");
    if (locationId == null || locationId === "") {
      return;
    }
    $.ajax({
      url: "libs/php/checkLocationUse.php",
      type: "POST",
      dataType: "json",
      data: { id: locationId },
      success: function (result) {
        if (result.status.code == 200) {
          var locationData = result.data[0];
          if (!locationData || locationData.departmentCount == 0) {
            $("#areYouSureLocationName").text(
              locationData?.locationName || "Unknown"
            );
            $("#deleteLocationId").val(locationId);
            $("#areYouSureDeleteLocationModal").modal("show");
          } else {
            $("#cantDeleteLocationName").text(locationData.locationName);
            $("#departmentCount").text(locationData.departmentCount);
            if ($("#cantDeleteLocationModal").length === 0) {
              console.error(
                "Modal #cantDeleteLocationModal does not exist in the DOM."
              );
              return;
            }
            $("#cantDeleteLocationModal").modal("show");
          }
        } else {
          console.error(
            "Error retrieving location dependencies:",
            result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error checking location dependencies:", textStatus);
        console.error("Response text:", jqXHR.responseText);
      },
    });
    event.preventDefault();
  });

  $("#confirmDeleteLocationBtn").click(function () {
    var locationId = $("#deleteLocationId").val();
    $.ajax({
      url: "libs/php/deleteLocation.php",
      type: "POST",
      dataType: "json",
      data: { id: locationId },
      success: function (result) {
        if (result.status.code == 200) {
          $("#areYouSureDeleteLocationModal").modal("hide");
          refreshLocationTable();
          showNotification("Location deleted successfully!");
        } else {
          showNotification(
            "Error deleting location: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error deleting location");
      },
    });
  });

  function populateDepartmentsDropdown(selectElement) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          if (result.status.name == "ok") {
            selectElement.empty();
            selectElement.append(
              $("<option>", {
                value: "",
                text: "Select a department",
                disabled: true,
                selected: true,
              })
            );
            $.each(result.data, function (index, department) {
              var optionText = department.name;
              if (department.inUse) {
                optionText += " (In use)";
              }
              selectElement.append(
                $("<option>", {
                  value: department.id,
                  text: optionText,
                })
              );
            });
            resolve();
          } else {
            reject("Error fetching departments: " + result.status.description);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject("Error fetching departments: " + textStatus);
        },
      });
    });
  }

  function populateLocationsDropdown(selectElement, selectedLocationId = "") {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          if (result.status.name == "ok") {
            selectElement.empty();
            selectElement.append(
              $("<option>", {
                value: "all",
                text: "All Locations",
                selected: true,
              })
            );
            $.each(result.data, function (index, location) {
              selectElement.append(
                $("<option>", {
                  value: location.id,
                  text: location.name,
                })
              );
            });
            selectElement.val(selectedLocationId).trigger("change");
            resolve();
          } else {
            reject("Error fetching locations: " + result.status.description);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          reject("Error fetching locations: " + textStatus);
        },
      });
    });
  }

  $("#editDepartmentModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var departmentId = button.data("id");
    if (!departmentId) {
      console.error("Department ID is not defined.");
      return;
    }
    $.ajax({
      url: "libs/php/getDepartmentByID.php",
      type: "GET",
      dataType: "json",
      data: { id: departmentId },
      success: function (result) {
        if (result.status.name == "ok") {
          var department = result.data;
          $("#editDepartmentID").val(department.id);
          $("#editDepartmentName").val(department.name);
          populateLocationsDropdown(
            $("#editDepartmentLocation"),
            department.locationID
          );
        } else {
          console.error("Error: " + result.status.description);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error fetching department details: " + textStatus);
        console.log("Response text: " + jqXHR.responseText);
      },
    });
  });

  $("#editDepartmentForm").on("submit", function (e) {
    e.preventDefault();
    var formData = {
      id: $("#editDepartmentID").val(),
      name: $("#editDepartmentName").val(),
      locationID: $("#editDepartmentLocation").val(),
    };
    $.ajax({
      url: "libs/php/updateDepartment.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#editDepartmentModal").modal("hide");
          refreshDepartmentTable();
          setTimeout(function () {
            showNotification(
              "Department <strong>" +
                formData.name +
                "</strong> has been successfully updated."
            );
          }, 500);
        } else {
          showNotification(
            "Error updating department: " + result.status.description
          );
          console.error("Error updating department:", result);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error updating department");
        console.error("Error updating department:", textStatus, errorThrown);
        console.error("Response text:", jqXHR.responseText);
      },
    });
  });

  $("#editLocationModal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var locationId = button.data("id");
    if (!locationId) {
      console.error("Location ID is not defined.");
      return;
    }
    $.ajax({
      url: "libs/php/getLocationByID.php",
      type: "POST",
      dataType: "json",
      data: { id: locationId },
      success: function (result) {
        if (result.status.name == "ok") {
          var location = result.data;
          $("#editLocationID").val(location.id);
          $("#editLocationName").val(location.name);
        } else {
          console.error(
            "Error fetching location details:",
            result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Error fetching location details:",
          textStatus,
          errorThrown
        );
        console.log("Response text:", jqXHR.responseText);
      },
    });
  });

  $("#editLocationForm").on("submit", function (e) {
    e.preventDefault();
    var formData = {
      id: $("#editLocationID").val(),
      name: $("#editLocationName").val().trim(),
    };
    if (!formData.name) {
      console.error("Invalid input: Location name is required");
      showNotification("Please provide a valid location name.");
      return;
    }
    $.ajax({
      url: "libs/php/updateLocation.php",
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (result) {
        if (result.status.code == 200) {
          $("#editLocationModal").modal("hide");
          refreshLocationTable();
          setTimeout(function () {
            showNotification(
              "Location <strong>" +
                formData.name +
                "</strong> has been successfully updated."
            );
          }, 500);
        } else {
          showNotification(
            "Error updating location: " + result.status.description
          );
          console.error("Error updating location:", result);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        showNotification("Error updating location");
        console.error("Error updating location:", textStatus, errorThrown);
        console.error("Response text:", jqXHR.responseText);
      },
    });
  });

  $("#addDepartmentModal").on("show.bs.modal", function () {
    var locationDropdown = $("#addDepartmentLocation");
    locationDropdown.empty();
    locationDropdown.append(
      $("<option>", {
        value: "",
        text: "Select a location",
        disabled: true,
        selected: true,
      })
    );
    $.ajax({
      url: "libs/php/getAllLocations.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        if (result.status.name === "ok") {
          $.each(result.data, function (index, location) {
            locationDropdown.append(
              $("<option>", {
                value: location.id,
                text: location.name,
              })
            );
          });
        } else {
          console.error(
            "Error fetching locations: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching locations: " + textStatus);
      },
    });
  });

  let currentFilterDepartment = "all";
  let currentFilterLocation = "all";
  let cachedDepartments = null;
  let cachedLocations = null;

  $("#filterModal").on("show.bs.modal", function () {
    currentFilterDepartment = $("#filterDepartmentDropdown").val() || "all";
    currentFilterLocation = $("#filterLocationDropdown").val() || "all";
    if (!cachedDepartments) {
      $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          if (result.status.name === "ok") {
            cachedDepartments = result.data;
            populateDropdown(
              $("#filterDepartmentDropdown"),
              cachedDepartments,
              "All Departments",
              currentFilterDepartment
            );
          } else {
            console.error(
              "Error fetching departments: " + result.status.description
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error fetching departments: " + textStatus);
        },
      });
    } else {
      populateDropdown(
        $("#filterDepartmentDropdown"),
        cachedDepartments,
        "All Departments",
        currentFilterDepartment
      );
    }
    if (!cachedLocations) {
      $.ajax({
        url: "libs/php/getAllLocations.php",
        type: "POST",
        dataType: "json",
        success: function (result) {
          if (result.status.name === "ok") {
            cachedLocations = result.data;
            populateDropdown(
              $("#filterLocationDropdown"),
              cachedLocations,
              "All Locations",
              currentFilterLocation
            );
          } else {
            console.error(
              "Error fetching locations: " + result.status.description
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error fetching locations: " + textStatus);
        },
      });
    } else {
      populateDropdown(
        $("#filterLocationDropdown"),
        cachedLocations,
        "All Locations",
        currentFilterLocation
      );
    }
  });

  function populateDropdown(dropdown, data, defaultText, selectedValue) {
    dropdown.empty();
    dropdown.append(
      $("<option>", {
        value: "all",
        text: defaultText,
        selected: true,
      })
    );
    data.forEach((item) => {
      dropdown.append(
        $("<option>", {
          value: item.id,
          text: item.name,
        })
      );
    });
    dropdown.val(selectedValue).trigger("change");
  }

  function setupFilterDropdowns() {
    $("#filterDepartmentDropdown")
      .off("change")
      .on("change", function () {
        if ($("#personnelBtn").hasClass("active")) {
          const selectedDepartment = $(this).val();
          if (selectedDepartment !== "all" && selectedDepartment) {
            $("#filterLocationDropdown").val("all").trigger("change");
            debouncedRefreshPersonnelTable(selectedDepartment, null);
          } else {
            debouncedRefreshPersonnelTable();
          }
        }
      });
    $("#filterLocationDropdown")
      .off("change")
      .on("change", function () {
        if ($("#personnelBtn").hasClass("active")) {
          const selectedLocation = $(this).val();
          if (selectedLocation !== "all" && selectedLocation) {
            $("#filterDepartmentDropdown").val("all").trigger("change");
            debouncedRefreshPersonnelTable(null, selectedLocation);
          } else {
            debouncedRefreshPersonnelTable();
          }
        }
      });
  }

  setupFilterDropdowns();

  $(document).on(
    "click",
    ".btn[data-bs-target='#areYouSureDeleteDepartmentModal']",
    function (event) {
      event.preventDefault();
      var departmentId = $(this).data("id");
      $.ajax({
        url: "libs/php/checkDepartmentUse.php",
        type: "POST",
        dataType: "json",
        data: { id: departmentId },
        success: function (result) {
          if (result.status.code == 200) {
            if (
              result.data.length === 0 ||
              result.data[0].personnelCount == 0
            ) {
              $("#areYouSureDeptName").text(
                result.data[0]?.departmentName || "Unknown"
              );
              $("#deleteDepartmentId").val(departmentId);
              $("#areYouSureDeleteDepartmentModal").modal("show");
            } else {
              $("#cantDeleteDeptName").text(result.data[0].departmentName);
              $("#personnelCount").text(result.data[0].personnelCount);
              $("#cantDeleteDepartmentModal").modal("show");
            }
          } else {
            console.error(
              "Error retrieving department dependencies:",
              result.status.description
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error checking department dependencies:", textStatus);
        },
      });
    }
  );

  $(document).on(
    "click",
    ".btn[data-bs-target='#areYouSureDeleteLocationModal']",
    function () {
      var locationId = $(this).data("id");
      if (!locationId) {
        console.error("Location ID is not defined.");
        return;
      }
      $.ajax({
        url: "libs/php/checkLocationUse.php",
        type: "POST",
        dataType: "json",
        data: { id: locationId },
        success: function (result) {
          if (result.status.code == 200) {
            var locationData = result.data[0];
            if (!locationData || locationData.departmentCount == 0) {
              $("#areYouSureLocationName").text(
                locationData?.locationName || "Unknown"
              );
              $("#deleteLocationId").val(locationId);
              $("#areYouSureDeleteLocationModal").modal("show");
            } else {
              $("#cantDeleteLocationName").text(locationData.locationName);
              $("#departmentCount").text(locationData.departmentCount);
              if ($("#cantDeleteLocationModal").length === 0) {
                console.error(
                  "Modal #cantDeleteLocationModal does not exist in the DOM."
                );
                return;
              }
              $("#cantDeleteLocationModal").modal("show");
            }
          } else {
            console.error(
              "Error retrieving location dependencies:",
              result.status.description
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error checking location dependencies:", textStatus);
          console.error("Response text:", jqXHR.responseText);
        },
      });
    }
  );

  $(document).on(
    "click",
    ".btn[data-bs-target='#deletePersonnelModal']",
    function () {
      var personnelId = $(this).data("id");
      $.ajax({
        url: "libs/php/checkPersonnelUse.php",
        type: "POST",
        dataType: "json",
        data: { id: personnelId },
        success: function (result) {
          if (result.status.code == 200) {
            if (result.data[0].dependencyCount == 0) {
              $("#areYouSurePersonnelName").text(result.data[0].personnelName);
              $("#areYouSurePersonnelID").val(personnelId);
              $("#areYouSurePersonnelModal").modal("show");
            } else {
              $("#cantDeletePersonnelName").text(result.data[0].personnelName);
              $("#dependencyCount").text(result.data[0].dependencyCount);
              $("#cantDeletePersonnelModal").modal("show");
            }
          } else {
            console.error(
              "Error retrieving personnel dependencies:",
              result.status.description
            );
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error checking personnel dependencies:", textStatus);
        },
      });
    }
  );

  $("#addBtn")
    .off("click")
    .on("click", function () {
      if ($("#personnelBtn").hasClass("active")) {
        $("#addPersonnelModal").modal("show");
      } else if ($("#departmentsBtn").hasClass("active")) {
        $("#addDepartmentModal").modal("show");
      } else if ($("#locationsBtn").hasClass("active")) {
        $("#addLocationModal").modal("show");
      } else {
        console.warn("Add action is only available in the relevant tab.");
      }
    });

  $("#addPersonnelModal").on("show.bs.modal", function () {
    var departmentDropdown = $("#addPersonnelDepartment");
    departmentDropdown.empty();
    departmentDropdown.append(
      $("<option>", {
        value: "",
        text: "Select a department",
        disabled: true,
        selected: true,
      })
    );
    $.ajax({
      url: "libs/php/getAllDepartments.php",
      type: "POST",
      dataType: "json",
      success: function (result) {
        if (result.status.name === "ok") {
          $.each(result.data, function (index, department) {
            departmentDropdown.append(
              $("<option>", {
                value: department.id,
                text: department.name,
              })
            );
          });
        } else {
          console.error(
            "Error fetching departments: " + result.status.description
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error fetching departments: " + textStatus);
      },
    });
  });

  $(".modal").on("hidden.bs.modal", function () {
    if (!$(this).is("#filterModal")) {
      $(this).find("form").trigger("reset");
      $(this).find("select").val("").trigger("change");
      $(this).find(".form-control").val("");
      $(this).find(".notification").remove();
    }
  });

  $("#filterDepartmentDropdown").on("change", function () {
    const selectedDepartment = $(this).val();
    const selectedLocation = $("#filterLocationDropdown").val();
    if ($("#personnelBtn").hasClass("active")) {
      refreshPersonnelTable(
        selectedDepartment !== "all" ? selectedDepartment : null,
        selectedLocation !== "all" ? selectedLocation : null
      );
    }
  });

  $("#filterLocationDropdown").on("change", function () {
    const selectedLocation = $(this).val();
    const selectedDepartment = $("#filterDepartmentDropdown").val();
    if ($("#personnelBtn").hasClass("active")) {
      refreshPersonnelTable(
        selectedDepartment !== "all" ? selectedDepartment : null,
        selectedLocation !== "all" ? selectedLocation : null
      );
    }
  });

  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const debouncedRefreshPersonnelTable = debounce(refreshPersonnelTable, 300);

  $("#filterDepartmentDropdown, #filterLocationDropdown").on(
    "change",
    function () {
      const selectedDepartment =
        $("#filterDepartmentDropdown").val() !== "all"
          ? $("#filterDepartmentDropdown").val()
          : null;
      const selectedLocation =
        $("#filterLocationDropdown").val() !== "all"
          ? $("#filterLocationDropdown").val()
          : null;
      if ($("#personnelBtn").hasClass("active")) {
        debouncedRefreshPersonnelTable(selectedDepartment, selectedLocation);
      }
    }
  );

  function searchTable(searchInput, tableBodyId) {
    const searchTerm = searchInput.toLowerCase();
    const rows = $(`#${tableBodyId} tr`);
    rows.each(function () {
      const rowText = $(this).text().toLowerCase();
      $(this).toggle(rowText.includes(searchTerm));
    });
  }

  $("#searchInp").on("input", function () {
    const searchValue = $(this).val();
    if ($("#personnelBtn").hasClass("active")) {
      searchTable(searchValue, "personnelTableBody");
    } else if ($("#departmentsBtn").hasClass("active")) {
      searchTable(searchValue, "departmentTableBody");
    } else if ($("#locationsBtn").hasClass("active")) {
      searchTable(searchValue, "locationTableBody");
    }
  });

  function resetSearchBar() {
    $("#searchInp").val("");
    if ($("#personnelBtn").hasClass("active")) {
      refreshPersonnelTable();
    } else if ($("#departmentsBtn").hasClass("active")) {
      refreshDepartmentTable();
    } else if ($("#locationsBtn").hasClass("active")) {
      refreshLocationTable();
    }
  }

  $("#personnelBtn, #departmentsBtn, #locationsBtn").on(
    "click",
    resetSearchBar
  );
});
