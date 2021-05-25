package com.yojana.model.timesheet;

import java.io.Serializable;
import java.util.Arrays;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * A class representing a single row of a Timesheet.
 * Note: Row details are based off of DB Schema.
 *
 * @author Abeer Haroon
 * @version 1.0
 */
@Entity //Due to Composite key, need to declare PK externally and then use here 
@IdClass(TimesheetRowPK.class)
@Table(name="TimesheetRow")
public class TimesheetRow implements Serializable {
    
 //-------------Data Table
    
    /** The timesheetId PK/FK . */
    @Id
    @Column(name="TimesheetID", nullable = false, insertable = false, updatable = false)
	@Type(type="uuid-char")
    private UUID timesheetId;
    
    /** Representing the Timesheet itself. 
     *  Many timesheet row, One Timesheet
     * Foreign key reference to timesheetId 
     * */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="TimesheetID")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Timesheet timesheet;
    
    /** The WorkPackageId. PK/FK 
     * Must be unique for a given projectId. */
    @Id
    @Column(name="WorkPackageID")
    private String workPackageId;
    
    /**Representing the Work Package itself.
     * One to One. One timesheet row ill have one workPackagteId
     *  */
  /* 
   * @PrimaryKeyJoinColumn(name = "WorkPackageID", referencedColumnName= "WorkPackageID")
     @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
     @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
     private WorkPackage workPackage;
     */
    
    /** The projectId PK/FK . */
    @Id
    @Column(name="ProjectID", nullable = false)
    private String projectId;
    
    /**Representing the Project itself.
     * One to One. One timesheet row ill have one projectId
     *  */
    /* 
     * @PrimaryKeyJoinColumn(name = "ProjectID", referencedColumnName= "ProjectID")
       @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
       @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
       private Project project;
       */
    
    /** hours for the week, packed into a long.
     * Each of the low-order 7 bytes is the decihours for one day.
     * Order is 00-SA-SU-MO-TU-WED-THU-FRI
     * Counting days d = 0 .. 6 (starting at Saturday) the position of 
     * a day's byte is shifted d * 8 bits to the left.
     */
    @Column(name="Hours")
    private long packedHours;
    
    
    /* Any notes added to the timesheet row. 
    private String notes;
    */
    
    /** notes for the work period */
    @Column(name="Notes")
    private String notes;

   
    //------------------------
    //  end of data table column
    //--------------------------
    
    //-------row indices
    
    /*Part of Timesheet row key Timesheet ID 
    public static final char TIMESHEET_ID = 0;
    */
    /**Timesheet row index Project ID */
    public static final char PROJECT_ID = 0;
    
    /**Timesheet row index for Work Package ID*/
    public static final char WORK_PACKAGE = 1;
    
    /** Timesheet row index Total hours. */ 
    public static final int TOTAL_HOURS = 2; 
        
    /** Timesheet row index for Saturday. */
    public static final int SAT = 3;
    
    /** Timesheet row index for Sunday.. */
    public static final int SUN = 4;
    
    /** Timesheet row index for Monday. */
    public static final int MON = 5;
    
    /** Timesheet row index for Tuesday. */
    public static final int TUE = 6;
    
    /** Timesheet row index for Wednesday. */
    public static final int WED = 7;
    
    /** Timesheet row index for Thursday. */
    public static final int THUR = 8;
    
    /** Timesheet row index for Friday. */
    public static final int FRI = 9;
    
    /** Timesheet row index for Notes 
    public static final int NOTES = 9;
    */

    // ---------------------------------------- --------------
    //      end of row index
    // --------------------------------------------------------
    
  //------- packing/unpacking
    /** decimal base in float. */
    public static final float BASE10 = 10.0F;
    
    /** Day number for Saturday. */
    public static final int FIRST_DAY = SAT;

    /** Day number for Friday. */
    public static final int LAST_DAY = FRI;

    /** Version number. */
    private static final long serialVersionUID = 4L;

    /** mask for packing, unpacking hours. */
    private static final long[] MASK = {0xFFL, 
                                        0xFF00L, 
                                        0xFF0000L, 
                                        0xFF000000L,
                                        0xFF00000000L, 
                                        0xFF0000000000L, 
                                        0xFF000000000000L};
    
    /** mask for packing, unpacking hours. */
    private static final long[] UMASK = {0xFFFFFFFFFFFFFF00L, 
                                         0xFFFFFFFFFFFF00FFL, 
                                         0xFFFFFFFFFF00FFFFL, 
                                         0xFFFFFFFF00FFFFFFL,
                                         0xFFFFFF00FFFFFFFFL, 
                                         0xFFFF00FFFFFFFFFFL, 
                                         0xFF00FFFFFFFFFFFFL};
    
    /** 2**8. */
    private static final long BYTE_BASE = 256;
    
    /** max number of deci-hours per day. */
    private static final int DECI_MAX = 240;
    
    /** number of bits in a byte. */
    private static final int BITS_PER_BYTE = 8;

    // ---------------------------------------- --------------
    //      end of data members for packing/unpacking
    // --------------------------------------------------------
    
    //static fields, used in helper methods
    public static final int DAYS_IN_WEEK = 7;
    public static final double HOURS_IN_DAY = 24.0;
    public static final int DECIHOURS_IN_DAY = 240;
    
    //-------------
    // end of static fields
    //------------
    
    
    /** No Argument constructor:
     * create empty timesheetRow to be modified later.
     * */
    public TimesheetRow() {
    }

    /**
     * Initialize timesheet row with instance data, no hours charged.
     * @param projectId project number
     * @param workPackageId work package id
     */
    public TimesheetRow(String projectId, String workPackageId) {
        this.projectId = projectId;
        this.workPackageId = workPackageId;
    }
    
    /**
     * Initialize timesheet row with instance data, hours charged (in order of
     * Sat, .. Friday.
     * @param projectId project number
     * @param workPackageId work package id
     * @param notes is a field for comments for this row
     * @param hours the charges for each day of the week.  There must be 7, or 
     *        else an array with 7 hours passed.
     */
    public TimesheetRow(String projectId, String workPackageId, String notes, 
            float...hours) {
        if (hours.length != DAYS_IN_WEEK) {
            throw new IllegalArgumentException("Wrong number of hours");
        }
        setHours(hours);
        this.projectId = projectId;
        this.workPackageId = workPackageId;
        //this.notes = notes;
    }
    
    //----------getter setter for timesheet, project, work package types----
    
    /** Getter for Timesheet type data member. */
    public Timesheet getTimesheet() {
        return this.timesheet;
    }
    /** Setter for Timesheet type data member. */
    public void setTimesheet(Timesheet timesheet) {
        this.timesheet = timesheet;
    }
    
    /* 
     * public WorkPackage getWorkPackage() {
        return this.workPackage;
    }
    
    public void setWorkPackage(wp) {
        this.workPackage = wp;
    }
     * */
    
    /* 
     * public Project getProject() {
        return this.project;
    }
    
    public void setProject(proj) {
        this.project = proj;
    }
     * */
    
    //-------------------------------------------------------------------------
    
    /**
     * convert hour to decihour.  hour rounded to one fractional decimal place.
     * @param hour as float
     * @return equivalent number of decihours as int
     */
    public static int toDecihour(float hour) {
        return Math.round(hour * BASE10);
    }
    
    /**
     * convert decihour to hour.  
     * @param decihour as int
     * @return equivalent number of hours as float
     */
    public static float toHour(int decihour) {
        return decihour / BASE10;
    }
    

    /**
     * projectId getter.
     * @return the projectId
     */
    public String getProjectId() {
        return projectId;
    }

    /**
     * projectId setter.
     * @param id the projectId to set, must be >= 0
     */
    public void setProjectId(final String id) {
        this.projectId = id;
    }

    /**
     * workPackageId getter.
     * @return the workPackageId
     */
    public String getWorkPackageId() {
        return workPackageId;
    }

    /**
     * workPackageId setter.
     * @param wp the workPackageId to set
     */
    public void setWorkPackageId(final String wp) {
        this.workPackageId = wp;
    }

    /**
     * packedHours getter.
     * @return the hours charged for each day, packed into a long.
     */
    public long getPackedHours() {
        return packedHours;
    }

    /**
     * packedHours setter.
     * @param packedHours the hours charged for each day, packed into a long
     */
    public void setPackedHours(final long packedHours) {
        checkHoursForWeek(packedHours);
        this.packedHours = packedHours;
    }

    /**
     * Extract the hours for a given day.
     * @param d the day number (0 = Saturday .. 6 = Friday)
     * @return hours for that day
     */
    public float getHour(int d) {
        return toHour(getDecihour(d));
    }
    
    /**
     * Set the hours for a given day. Rounded to one decimal.
     * @param d the day number (0 = Saturday .. 6 = Friday)
     * @param charge hours charged for that day
     * @throws IllegalArgumentException if charge < 0 or > 24
     */
    public void setHour(int d, float charge) {
        if (charge < 0.0 || charge > HOURS_IN_DAY) {
            throw new IllegalArgumentException("Charge is out of range");
        }
        setDecihour(d, toDecihour(charge));
    }
    
    /**
     * getter for notes section.
     * @return the notes
     
    public String getNotes() {
        return notes;
    }
    */
    
    /**
     * setter for notes section.
     * @param notes the notes to set
     
    public void setNotes(final String notes) {
        this.notes = notes;
    }
    */
    
    /**
     * adds total hours for this timesheet row.
     * @return the weekly hours
     */
    public Float getSum() {
        return toHour(getDeciSum());
    }
    
    /**
     * Adds total hours for this timesheet row.
     * @return total hours in units of decihours
     */
    public int getDeciSum() {
        int[] charges = getDecihours();
        int sum = 0;
        for (int charge: charges) {
            sum += charge;
        }
        return sum;
    }
    
    /**
     * Extract the integer hours * 10 for a given day.
     * @param d the day number (0 = Saturday .. 6 = Friday)
     * @return hours for that day
     */
    public int getDecihour(int d) {
        if (d < FIRST_DAY || d > LAST_DAY) {
            throw new IllegalArgumentException("day number out of range");
        }
        return (int) ((packedHours & MASK[d]) >> d * BITS_PER_BYTE);
    }
    
    /**
     * Set the integer hours * 10 for a given day.
     * @param d the day number (0 = Saturday .. 6 = Friday)
     * @param charge hours charged for that day
     * @throws IllegalArgumentException if invalid day or charge
     */
    public void setDecihour(int d, int charge) {
        if (d < FIRST_DAY || d > LAST_DAY) {
            throw new IllegalArgumentException("day number out of range, " 
                        + "must be in 0 .. 6");
        }
        if (charge < 0 || charge > DECI_MAX) {
            throw new IllegalArgumentException("charge out of range, " 
                        + "must be 0 .. 240");
        }
        packedHours = packedHours & UMASK[d]
                | (long) charge << (d * BITS_PER_BYTE);
    }
    
    /**
     * Get hours array of charges, index is day number.
     * @return hours as array of charges
     */
    public float[] getHours() {
        float[] result = new float[LAST_DAY + 1];
        long check = packedHours;
        for (int i = FIRST_DAY; i <= LAST_DAY; i++) {
            result[i] = check % BYTE_BASE / BASE10;
            check /= BYTE_BASE;
        }
        return result;
    }
    
    /**
     *  Convert hours array to packed hours and store in hours field.
     *  Index of array is day of week number, starting with Saturday
     * @param charges array of hours to pack (single fractional digit)
     * @throws IllegalArgumentException if charges < 0 or > 24
     */
    public void setHours(float[] charges) {
        for (float charge : charges) {
            if (charge < 0.0 || charge > HOURS_IN_DAY) {
                throw new IllegalArgumentException("charge is out of " 
                            + "maximum hours in day range");           
            }
        }
        long result = 0;
        for (int i = LAST_DAY; i >= FIRST_DAY; i--) {
            result = result * BYTE_BASE + toDecihour(charges[i]);
        }
        packedHours = result;
    }
    
    /**
     * Get hours array of charges, index is day number.
     * @return hours as array of charges
     */
    public int[] getDecihours() {
        int[] result = new int[LAST_DAY + 1];
        long check = packedHours;
        for (int i = FIRST_DAY; i <= LAST_DAY; i++) {
            result[i] = (int) (check % BYTE_BASE);
            check /= BYTE_BASE;
        }
        return result;
    }
    
    /**
     *  Convert hours array to packed hours and store in hours field.
     *  Index of array is day of week number, starting with Saturday
     * @param charges array of hours to pack (single fractional digit)
     * @throws IllegalArgumentException if charges < 0 or > 24
     */
    public void setDecihours(int[] charges) {
        for (float charge : charges) {
            if (charge < 0 || charge > DECIHOURS_IN_DAY) {
                throw new IllegalArgumentException("charge is out of " 
                            + "maximum hours in day range");           
            }
        }
        long result = 0;
        for (int i = LAST_DAY; i >= FIRST_DAY; i--) {
            result = result * BYTE_BASE + charges[i];
        }
        packedHours = result;
    }
    
    /* throw IllegalArgumentException if an hour is out of range */
    private void checkHoursForWeek(final long packedDecihours) {
        if (packedDecihours < 0) {
            throw new IllegalArgumentException(
                    "improperly formed packedHours < 0");
        }    
        long check = packedDecihours;
        for (int i = FIRST_DAY; i <= LAST_DAY; i++) {
            if (check % BYTE_BASE > DECIHOURS_IN_DAY) {
                throw new IllegalArgumentException(
                        "improperly formed packedHours");
            }
            check /= BYTE_BASE;
        }
        //top byte must be zero
        if (check > 0) {
            throw new IllegalArgumentException(
                    "improperly formed packedHours");
        }

    }
    
    @Override
    public String toString() {
        return "Project ID: " + projectId + "\nTimsheetID: " + timesheetId + "\nWork Package ID: " + workPackageId + " \n" 
                + Arrays.toString(getHours());
    }
    

}
