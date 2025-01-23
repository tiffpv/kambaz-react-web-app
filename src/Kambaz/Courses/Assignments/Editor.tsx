export default function AssignmentsEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name"><strong>Assignment Name</strong></label>
      <br /><br />
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description" cols={50} rows={10}>
        The assignment is available online Submit a 
        link to the landing page of your Web
        application running on Netlify. The landing
        page should include the following: Your full
        name and section Links to each of the lab 
        assignments Link to the Kambaz application
        Links to all relevant source code repositories
        The Kambaz application should include a link 
        to navigate back to the landing page.
      </textarea>
      <br /><br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
                <select id="wd-assignment-group">
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                </select>
            </td>
        </tr>
        <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
                <select id="wd-display-grade">
                    <option selected value="Percentage">Percentage</option>
                </select>
            </td>
        </tr>
        <br />
        <tr>
            <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
                <select id="wd-submission-type">
                    <option selected value="Online">Online</option>
                </select>
                <br /><br />
                <div>
                    <label>Online Entry Options</label><br/>
                    
                    <input type="checkbox" name="online-entry-type" id="wd-chkbox-text-entry"/>
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br />

                    <input type="checkbox" name="online-entry-type" id="wd-chkbox-web-url"/>
                    <label htmlFor="wd-chkbox-web-url">Website URL</label><br />

                    <input type="checkbox" name="online-entry-type" id="wd-chkbox-media"/>
                    <label htmlFor="wd-chkbox-media">Media Recordings</label><br />

                    <input type="checkbox" name="online-entry-type" id="wd-chkbox-student"/>
                    <label htmlFor="wd-chkbox-student">Student Annotation</label><br />

                    <input type="checkbox" name="online-entry-type" id="wd-chkbox-file"/>
                    <label htmlFor="wd-chkbox-file">File Uploads</label><br /><br />

                    <label htmlFor="wd-assign-to" style={{ marginRight: '20px' }}>Assign Assign to</label><br />
                    <input id="wd-assign-to" value="Everyone" /><br /><br />

                    <label htmlFor="wd-due-date">Due</label><br />
                    <input type="date" id="wd-due-date" value="2024-05-13" /><br />
                    <br />
                    <label htmlFor="wd-available">Available from</label>
                    <label htmlFor="wd-until" style={{ marginLeft: '25px' }}>Until</label><br />
                    <input type="date" id="wd-avilable" value="2024-05-06" />
                    <input type="date" id="wd-until" value="2024-05-20" />
                </div>
            </td>
        </tr>
      </table>
      <div style={{textAlign: "right"}}><hr />
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
    );
}
