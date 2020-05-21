import moment from 'moment';
import csvStringify from 'csv-stringify';
import streamSaver from 'streamsaver';

const config = {
  header: true,
  quoted: true,
  quoted_empty: true,
};

/**
 * This class is used for export participant list into a csv file.
 */
export const exportParticipants = (participants) => {
  const fileName = `Participant_${moment().format(moment.HTML5_FMT.DATE)}.csv`;

  // Get a write stream to the file
  const fileStream = streamSaver.createWriteStream(fileName);
  const writer = fileStream.getWriter();

  // Create a stream for parsing participant record into a row in csv file
  const stringifier = csvStringify(config);

  stringifier.on('readable', async function(){
    // Write each row into csv file
    let row = stringifier.read();
    return !!row ? await writer.write(row) : writer.close();
  })

  participants.forEach(participant => {
    // Parse each participant into a row in csv file
    stringifier.write(participant);
  });

  stringifier.end();
}
