package com.justc0de.imagepuzzle;

import java.util.Date;
import java.util.Vector;

public class GAEDataStoreOperations implements DataStorage {

	public Vector<TimeEntry> getTopTimes() {
		// TODO query DataStore for all TopTimeEntry Entities
		
		return null;
	}

	public Date getTopTimeForGridSize(int gridSize) {
		// TODO query DataStore for TopTimeEntry Entity for particular gridSize
		
		return null;
	}

	public void setTopTimeForGridSize(TimeEntry timeEntry) {
		//TODO update DataStore TopTimeEntry Entity for particular gridSize
	}
}