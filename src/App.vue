<template>
  <div id="app">
    <div class="top-image">
      <img src="./assets/seed.png">
    </div>
    <div class="main">
    
      <h1>///////generative1</h1>

      

      <div class="fixed-buttons">
        <div class="btn btn-back" @click="sectionBack()" v-if="s.section!=='' || s.show_help">back</div>
        <div class="btn btn-help" @click="sectionHelp()" v-if="!s.show_help">help</div>
        <div class="btn" @click="toggleSection('settings')">settings</div>
        <div class="btn" @click="saveConfig()">save</div>
        <div class="btn" @click="importConfig()">import</div>
        <div class="btn" @click="submit()">generate</div>
      </div>

      <div class="shade" @click="sectionBack()" v-if="s.section!=='' || s.show_help"></div>

      <div class="track-info">
        <div class="form-item">
          <div class="form-item-title">Name</div>
          <input type="text" v-model="c.name">
        </div>

        <div class="form-item">
          <div class="form-item-title">Sequence Length</div>
          <input type="number" v-model="c.sequence_length">
        </div>

        <div class="form-item">
          <div class="form-item-title">Mode</div>
          <select v-model="c.mode">
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="chromatic">Chromatic</option>
          </select>
        </div>

        <div class="btn btn-big btn-generate" @click="submit()">generate midi</div>
      </div>

      

      <hr>
      <hr>
      <hr>

      <div class="nav" >

        <div class="splitter-title">Weights</div>

        <div class="btn section-title" @click="toggleSection('interval_weights')">
          intervals
        </div>

        <div class="btn section-title" @click="toggleSection('ch_interval_weights')">
          chromatic intervals
        </div>

        <div class="btn section-title" @click="toggleSection('octave_weights')">
          octave
        </div>

        <div class="btn section-title" @click="toggleSection('harmonic_interval_weights')">
          harmonic intervals
        </div>

        <div class="btn section-title" @click="toggleSection('harmony_amount_weights')">
          harmony amounts
        </div>

        <div class="btn section-title" @click="toggleSection('duration_weights')">
          durations
        </div>

        <div class="splitter-title">Sequence</div>

        <div class="btn section-title" @click="toggleSection('sequence_probability')">
          probabilities
        </div>
        
        <div class="btn section-title" @click="toggleSection('sequence_harmony_probability')">
          harmony probabilities
        </div>

        <div class="btn section-title" @click="toggleSection('sequence_bend')">
          bends
        </div>

        <div class="btn section-title" @click="toggleSection('sequence_velocity')">
          velocities
        </div>

        <div class="btn section-title" @click="toggleSection('sequence_duration')">
          durations
        </div>

        <div class="splitter-title">Misc</div>

        <div class="btn section-title" @click="toggleSection('misc_options')">
          misc options
        </div>

      </div>

      <div class="section-modal" v-if="s.section==='settings'">
        <div class="form-item">
          <div class="form-item-title">Settings</div>
          
          <div class="sub-title">Output Directory</div>
          <br>
          <div class="btn btn-big" @click="setDir()">select</div>
          <br>
          <span v-if="c.output_dir !==''">{{c.output_dir}}</span>
          <hr>

          <div class="sub-title">Output config JSON: </div> 
          <div class="btn btn-small" @click="c.generate_json=!c.generate_json">
            {{c.generate_json}}
          </div>
          <br>

          <div class="sub-title">Append timestamp to file name: </div> 
          <div class="btn btn-small" @click="c.append_timestamp=!c.append_timestamp">
            {{c.append_timestamp}}
          </div>
          <br>

        </div>
      </div>

      <div class="section-modal" v-if="s.section==='interval_weights'">

        <div class="form-item">
          <div class="form-item-title">Interval Weights</div>
          <div v-for="(value, index) of c.interval_weights" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <input type="range" min="0" max="256" v-model="c.interval_weights[index]" class="slider">
              <input type="number" class="number-small" v-model="c.interval_weights[index]">
            </div>
          </div>
        </div>

      </div>

      <div class="section-modal" v-if="s.section==='ch_interval_weights'">

        

        <div class="form-item">
          <div class="form-item-title">Chromatic Interval Weights</div>
          <div v-for="(value, index) of c.ch_interval_weights" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <input type="range" min="0" max="256" v-model="c.ch_interval_weights[index]" class="slider">
              <input type="number" class="number-small" v-model="c.ch_interval_weights[index]">
            </div>
          </div>
        </div>
      
      </div>

      <div class="section-modal" v-if="s.section==='octave_weights'">

        

        <div class="form-item">
          <div class="form-item-title">Octave Weights</div>
          <div v-for="(value, index) of c.octave_weights" :key="index">
            <div class="array-item">
              <div class="array-title">{{index}}</div>
              <input type="range" min="0" max="256" v-model="c.octave_weights[index]" class="slider">
              <input type="number" class="number-small" v-model="c.octave_weights[index]">
            </div>
          </div>
        </div>

      </div>

      <div class="section-modal" v-if="s.section==='harmonic_interval_weights'">

        <div class="form-item">
          <div class="form-item-title">Harmonic Interval Weights</div>
          <div v-for="(value, index) of c.harmonic_interval_weights" :key="index">
            <div class="array-item">
              <div class="array-title">{{index}}</div>
              <input type="range" min="0" max="256" v-model="c.harmonic_interval_weights[index]" class="slider">
              <input type="number" class="number-small" v-model="c.harmonic_interval_weights[index]">
            </div>
          </div>
        </div>
        
        <div class="form-item center">
          <div class="sub-title">Limit Harmony To Scale: </div>
          <div class="btn btn-small" @click="c.limit_harmony_to_scale=!c.limit_harmony_to_scale">
            {{c.limit_harmony_to_scale}}
          </div>
        </div>
      
      </div>

      <div class="section-modal" v-if="s.section==='harmony_amount_weights'">
      
        <div class="form-item">
          <div class="form-item-title">Harmony Amount Weights</div>
          <div v-for="(value, index) of c.harmony_amount_weights" :key="index">
            <div class="array-item">
              <div class="array-title">{{index}}</div>
              <input type="range" min="0" max="256" v-model="c.harmony_amount_weights[index]" class="slider">
              <input type="number" class="number-small" v-model="c.harmony_amount_weights[index]">
            </div>
          </div>
        </div>
      
      </div>

      <div class="section-modal" v-if="s.section==='duration_weights'">

        

        <div class="form-item">
          <div class="form-item-title">Duration Weights</div>
          <div class="array-item">
            <div class="array-title atl">8/1</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['t1024']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['t1024']">
          </div>
          <div class="array-item">
            <div class="array-title atl">4/1</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['t512']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['t512']">
          </div>
          <div class="array-item">
            <div class="array-title atl">2/1</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['t256']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['t256']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/1</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['1']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['1']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/2</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['2']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['2']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/d2</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['d2']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['d2']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/dd2</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['dd2']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['dd2']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/4</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['4']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['4']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/4t</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['4t']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['4t']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/d4</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['d4']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['d4']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/dd4</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['dd4']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['dd4']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/8</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['8']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['8']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/8t</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['8t']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['8t']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/d8</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['d8']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['d8']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/dd8</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['dd8']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['dd8']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/16</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['16']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['16']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/16t</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['16t']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['16t']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/32</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['32']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['32']">
          </div>
          <div class="array-item">
            <div class="array-title atl">1/64</div>
            <input type="range" min="0" max="256" v-model="c.duration_weights['64']" class="slider">
            <input type="number" class="number-small" v-model="c.duration_weights['64']">
          </div>
        </div>
      
      </div>

      <div class="section-modal" v-if="s.section==='sequence_probability'">

        

        <div class="form-item">
          <div class="form-item-title">Sequence Probability</div>
          <div v-for="(value, index) of c.sequence_probability" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <input type="range" min="0" max="100" v-model="c.sequence_probability[index]" class="slider">
              <input type="number" class="number-small" v-model="c.sequence_probability[index]">
              <div class="btn btn-sm" @click="removeFromArray('sequence_probability',index)">⮾</div>
            </div>
          </div>
          <div class="btn btn-sm btn-add" @click="addToArray('sequence_probability')">+ add element</div>
        </div>

      </div>

      <div class="section-modal" v-if="s.section==='sequence_bend'">

        

        <div class="form-item">
          <div class="form-item-title">Sequence Pitch Bend</div>
          <div v-for="(value, index) of c.sequence_bend" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <span v-if="c.sequence_bend[index] !=='?'">
                <input type="range" min="-1.0" max="1.0" step="0.01" v-model="c.sequence_bend[index]" class="slider">
                <input type="number" class="number-small" v-model="c.sequence_bend[index]">
              </span>
              <span class="random-arr" v-if="c.sequence_bend[index] ==='?'">
                random
              </span>
              <div class="btn btn-sm" @click="randomToArray('sequence_bend',index)">⚄</div><div class="btn btn-sm" @click="removeFromArray('sequence_velocity',index)">⮾</div>
            </div>
          </div>
          <div class="btn btn-sm btn-add" @click="addToArray('sequence_bend')">+ add element</div>
        </div>
      
      </div>


      <div class="section-modal" v-if="s.section==='sequence_velocity'">

        <div class="form-item">
          <div class="form-item-title">Sequence Velocity</div>
          <div v-for="(value, index) of c.sequence_velocity" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <span v-if="c.sequence_velocity[index] !=='?'">
                <input type="range" min="0" max="100" v-model="c.sequence_velocity[index]" class="slider">
                <input type="number" class="number-small" v-model="c.sequence_velocity[index]">
              </span>
              <span class="random-arr" v-if="c.sequence_velocity[index] ==='?'">
                random <!--{{c.velocity_min}}->{{c.velocity_max}}-->
              </span>
              <div class="btn btn-sm" @click="randomToArray('sequence_velocity',index)">⚄</div><div class="btn btn-sm" @click="removeFromArray('sequence_velocity',index)">⮾</div>
            </div>
          </div>
          <div class="btn btn-sm btn-add" @click="addToArray('sequence_velocity')">+ add element</div>
        </div>
      
      </div>


      <div class="section-modal" v-if="s.section==='sequence_duration'">

        

        <div class="form-item">
          <div class="form-item-title">Sequence Duration</div>
          <div v-for="(value, index) of c.sequence_duration" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <select v-model="c.sequence_duration[index]">
                    <option value="?">random</option>
                    <option value="t1024">8/1</option>
                    <option value="t512">4/1</option>
                    <option value="t256">2/1</option>
                    <option value="1">1/1</option>
                    <option value="2">1/2</option>
                    <option value="d2">1/d2</option>
                    <option value="dd2">1/dd2</option>
                    <option value="4">1/4</option>
                    <option value="4t">1/4t</option>
                    <option value="d4">1/d4</option>
                    <option value="dd4">1/dd4</option>
                    <option value="8">1/8</option>
                    <option value="8t">1/8t</option>
                    <option value="d8">1/d8</option>
                    <option value="dd8">1/dd8</option>
                    <option value="16">1/16</option>
                    <option value="16t">1/16t</option>
                    <option value="32">1/32</option>
                    <option value="64">1/64</option>          
              </select>
              <div class="btn btn-sm" @click="removeFromArray('sequence_duration',index)">⮾</div>
            </div>
          </div>
          <div class="btn btn-sm btn-add" @click="addToArray('sequence_duration','?')">+ add element</div>
        </div>

      </div>

      <div class="section-modal" v-if="s.section==='sequence_harmony_probability'">

        

        <div class="form-item">
          <div class="form-item-title">Sequence Harmony Probability</div>
          <div v-for="(value, index) of c.sequence_harmony_probability" :key="index">
            <div class="array-item">
              <div class="array-title">{{index+1}}</div>
              <input type="range" min="0" max="100" v-model="c.sequence_harmony_probability[index]" class="slider">
              <input type="number" class="number-small" v-model="c.sequence_harmony_probability[index]">
              <div class="btn btn-sm" @click="removeFromArray('sequence_harmony_probability',index)">⮾</div>
            </div>
          </div>
          <div class="btn btn-sm btn-add" @click="addToArray('sequence_harmony_probability')">+ add element</div>
        </div>
      
      </div>

      <div class="section-modal" v-if="s.section==='misc_options'">

        

        <div class="form-item center">
          <div class="form-item-title">Misc Options</div>

          <div class="sub-title">Overall Probability</div>
          <br>
          <input type="range" min="0" max="100" v-model="c.overall_probability" class="slider">
          <input type="number" class="number-small" v-model="c.overall_probability">
          <br>

          <div class="sub-title">Velocity Min</div>
          <br>
          <input type="range" min="0" max="100" v-model="c.velocity_min" class="slider">
          <input type="number" class="number-small" v-model="c.velocity_min">
          <br>

          <div class="sub-title">Velocity Max</div>
          <br>
          <input type="range" min="0" max="100" v-model="c.velocity_max" class="slider">
          <input type="number" class="number-small" v-model="c.velocity_max">
          <br>

          <div class="sub-title">Bend Min</div>
          <br>
          <input type="range" min="-1" max="1" step="0.01" v-model="c.bend_min" class="slider">
          <input type="number" class="number-small" v-model="c.bend_min">
          <br>
          
          <div class="sub-title">Bend Max</div>
          <br>
          <input type="range" min="-1" max="1" step="0.01" v-model="c.bend_max" class="slider">
          <input type="number" class="number-small" v-model="c.bend_max">
          <br>

        </div>
      
      </div>

      <div class="help-modal" v-if="s.show_help">
        <h1>help</h1>

        <div v-if="s.section===''">
          Welcome to generative1. Select a section and click `help` again to see specific help info.
        </div>

        <div v-if="s.section==='interval_weights'">
          Most scales consist of 7 notes. Starting on the tonic (root note, unison) and ending on the 7th.
          <br><br>
          Use this screen to assign a weighted probability value to each interval in your scale.
          <br><br>
          The more weight that is assigned to a given interval, the more likely that interval is to be selected for
          any given (root) note in the midi file. 
          <br><br>
          Note: This only affects the root note being generated and not harmonization.
          <br><br>
          Tip: Favoring the supertonic (interval 2) is a common technique used in pop music.
        </div>

        <div v-if="s.section==='ch_interval_weights'">
          A chromatic scale consists of all 12 notes (from western music).
          <br><br>
          Use this screen to assign a weighted probability value to each interval in your chromatic scale.
          <br><br>
          The more weight that is assigned to a given interval, the more likely that interval is to be selected for
          any given (root) note in the midi file. 
          <br><br>
          Note: This is only used when the mode is set to chromatic.
          <br><br>
          Note: This only affects the root note being generated and not harmonization.
          <br><br>
          Tip: Favoring the supertonic (interval 2) is a common technique used in pop music.
        </div>

        <div v-if="s.section==='octave_weights'">
          The human range of hearing consists of about 12 octaves. An octave is a group of 12 notes (a full chromatic scale).
          <br><br>
          Use this screen to assign a weighted probability value to each octave.
          <br><br>
          The more weight that is assigned to a given octave, the more likely that octave is to be selected for
          any given note in the midi file. 
          <br><br>
          Tip: A good place to start is by heavily weighting the 4th octave.
        </div>

        <div v-if="s.section==='harmonic_interval_weights'">
          Harmony is a word that describes playing 2 or more notes at the same time 
          that have a pleasing acoustic relationship.
          <br><br>
          Use this screen to assign a weighted probability value to each harmonic interval.
          <br><br>
          The more weight that is assigned to a given interval, the more likely that interval is to be selected to
          harmonize with a given root note in the midi file. 
          <br><br>
          Tip: You can limit the harmony to only notes in the selected scale.
          <br><br>
          Tip: A good place to start is heavily weighting the 7th interval which is the perfect 5th.
        </div>

        <div v-if="s.section==='harmony_amount_weights'">
          Harmony is a word that describes playing 2 or more notes at the same time 
          that have a pleasing acoustic relationship. You can play up to 7 notes of harmony at a time.
          <br><br>
          Use this screen to assign a weighted probability value to each harmony amount.
          <br><br>
          The more weight that is assigned to a given amount, the more likely that amount of harmony is to be selected.
        </div>

        <div v-if="s.section==='duration_weights'">
          When your sequence has a random duration, it will be selected based off the weights of the values here.
          <br><br>
          The more weight that is assigned to a given duration, the more likely that duration is to be selected
          as the random duration that will be assigned to the note in the sequence.
          <br><br>
          Tip: Using random sequence durations can lead to very strange output. 
          <br><br>
          Tip: Giving weight to only one vale here can make the output more stable. 
        </div>

        <div v-if="s.section==='sequence_probability'">
          Use this screen to assign a (non-weighted) probability value to each element of the sequence.
          <br><br>
          A value of 100 will lead to a 100% change that element is played and a value of 50 would be a 50% chance.
          <br><br>
          Tip: Setting a single element to 0 here can add a rhythmic element to the output. 
        </div>

        <div v-if="s.section==='sequence_velocity'">
          Velocity is a word used to describe how "hard" a note is played.  
          <br><br>
          Use this screen to assign a sequence of velocities.
          <br><br>
          Tip: Try setting increasing or decreasing the velocity over the course of the sequence
          to give the output a pulsing feel.
          <br><br>
          Tip: Try setting a random velocity value with the die button.
        </div>

        <div v-if="s.section==='sequence_duration'">
          Duration determines how long the note or chord will be played.  
          <br><br>
          Use this screen to assign a sequence of durations.
          <br><br>
          Tip: Using random sequence durations can lead to very strange output. 
        </div>

        <div v-if="s.section==='sequence_harmony_probability'">
          Use this screen to assign a (non-weighted) probability value to each element of the sequence.
          <br><br>
          This value will determine the likelihood that a sequence element will contain a harmony.
        </div>

        <div v-if="s.section==='sequence_bend'">
          Use this screen to sequence pitch bends.
          <br><br>
          Tip: Use the die to assign a random pitch bend value.
        </div>

        <div v-if="s.section==='misc_options'">
          This page contains various options that control the range out midi output.
          <br><br>
          These values only affect randomly generated elements and not elements that you set manually.
        </div>

        <div v-if="s.section==='settings'">
          This is the settings menu. These settings do not affect the contents of the midi output. 
        </div>

      </div>

      <hr>

      <div class="footer">
        <div class="center"> made with ♥</div>
        <div class="center"> mathieu dombrock 2022 | GPL </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data: ()=>{
    return {
      s:{
        section:'',
        show_help:false,
      },
      c:{
        "name":"test",
        "sequence_length":256,
        "mode":"major",
        "key":"C",
        "interval_weights":[1,8,1,1,1,1,1],
        "ch_interval_weights":[1,1,1,1,1,1,1,1,1,1,1],
        "octave_weights":[0,0,0,8,16,4,0,0,0,0,0],
        "harmonic_interval_weights":[0,0,0,0,1,1,1,1,0,0,0,0],
        "harmony_amount_weights":[0,0,0,100,0,0,0,0],
        "sequence_probability":[100,100,100,50],
        "sequence_bend":[0],
        "sequence_velocity":[50,75,65,100,"?"],
        "sequence_duration":["1","2","?","?"],
        "sequence_harmony_probability":[0,0,0,0],
        "duration_weights":{
          "t1024":0,
          "t512":0,
          "t256":0,
          "1":0,
          "2":0,
          "d2":0,
          "dd2":0,
          "4":1,
          "4t":0,
          "d4":0,
          "dd4":0,
          "8":0,
          "8t":0,
          "d8":0,
          "dd8":0,
          "16":0,
          "16t":0,
          "32":0,
          "64":0
        },
        
        "limit_harmony_to_scale":true,
        "overall_probability":100,
        "velocity_min":20,
        "velocity_max":100,
        "bend_min":-1.0,
        "bend_max":1.0,
        "output_dir":'',
        "generate_json":true,
        "append_timestamp":true
      }
    }
  },
  methods:{
    addToArray(arr,val=0){
      this.c[arr].push(val);
    },
    removeFromArray(arr,index){
      this.c[arr].splice(index,1);
    },
    randomToArray(arr, index, defVal=0){
      if(this.c[arr][index] !== '?'){
        this.$set(this.c[arr], index, '?');
        //this.c[arr][index] = '?';
      }else{
        this.$set(this.c[arr], index, defVal);
        //this.c[arr][index] = 0;
      }
    },
    submit(){
      //alert(JSON.stringify(this.c,null,2));
      if(this.c.output_dir==='' || this.c.output_dir === undefined){
        alert("Please select an output directorty");
        this.s.section = "settings";
        return;
      }
      const { ipcRenderer } = window.require('electron');
      const res = ipcRenderer.sendSync('generateMidi', this.c);
      console.log(res); 
      if(res === 'done'){
        const conf = confirm('done. \r\n \r\nwould you like to open the output directory?');
        if(conf){
          ipcRenderer.sendSync('openOutput', this.c.output_dir);
        }
      }
    },
    setDir(){
      const { ipcRenderer } = window.require('electron');
      const dir = ipcRenderer.sendSync('dir-select', 'x');
      console.log('DIR: '+dir);
      this.c.output_dir = dir.filePaths[0];
    },
    toggleSection(name){
      this.s.section = name;
    },
    sectionBack(){
      if(this.s.show_help){
        this.s.show_help = false;
        return;
      }
      this.s.section = '';
    },
    sectionHelp(){
      this.s.show_help = true;
    },
    saveConfig(){
      alert('coming soon!');
    },
    importConfig(){
      alert('coming soon!');
    }
  }
}
</script>

<style>
:root{
  --scrollbar-width:3px;
  --shade:rgba(15, 15, 15,0.78);
  --bg:rgb(33,33,33);
  --bg-light:rgb(45,45,45);
  --high:rgb(100, 200, 170);
  --high-low:rgb(75, 150, 120);
  --high-low2:rgb(50, 100, 80);
  --text:rgb(175,175,175);
  --text-dark:rgb(66,66,66);
  --app-width:800px;
}
h1{
  color:var(--high);
  background:var(--bg-light);
  padding:0.5rem;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
hr{
  border-color:var(--text);
}
body{
  background:rgb(33,33,33);
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */     
}
#app {
  font-family: 'Courier New', monospace;
  #font-family: Tahoma, sans-serif;
  #font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  #text-align: center;
  margin:0 auto;
  color: var(--text);
  max-width:100vw;
}

input {
  -webkit-user-select:all;  /* Chrome all / Safari all */
  -moz-user-select: all;     /* Firefox all */
  -ms-user-select: all;      /* IE 10+ */
  user-select: all;          /* Likely future */     
  width: 100%;
  height: 2rem;
  box-sizing: border-box;
  border: 1px solid var(--bg-light);
  border-radius: 4px;
  background-color: var(--bg-light);
  color:var(--text);
  font-size: 1.75rem;
  padding:0.25rem;
  resize: none;
  vertical-align: text-bottom;
}
input[type=checkbox] {
  width:1rem;
  height:1rem;
  background: var(--bg-light);
}

select{
  background-color: var(--bg-light);
  color:var(--text);
  font-size: 16px;
}

.top-image{
  padding-top:2rem;
  text-align:center;
  background:var(--high-low);
}
.top-image img{
  max-width:100px;
  margin:0 auto;
}

.center{
  text-align:center;
}
.form-item{
  padding:0.5rem;
  margin:0 auto;
  max-width:var(--app-width);
}
.slider{
  min-width:300px;
  max-width:300px;
}
.random-arr{
  display:inline-block;
  height:2rem;
  font-size:2rem;
  min-width:375px;
  max-width:375px;
  text-align:center;
  background:var(--bg-light);
  margin-left:3px;
  margin-right:2px;
}
.number-small{
  max-width:75px;
}
.array-title{
  display:inline-block;
  width:50px;
  line-height:1rem;
  font-size:1.2rem;
  text-align:center;
  color:var(--high);
}
.atl{
  width:75px;
}
.sub-title{
  display:inline-block;
  vertical-align: text-bottom;
  text-transform:lowercase;
}
.form-item-title{
  text-transform:lowercase;
  font-size:24px;
  border-bottom:1px solid var(--text);
  padding:0.3rem;
  width:calc(100% - 2rem);
  color:var(--high)
}
.form-item-title::before{
  content: '/// ';
}
.shade{
  z-index:998;
  position:fixed;
  top:0;
  width:100vw;
  height:100%;
  background:var(--shade);
  padding:1rem;
  cursor:pointer;
}
.help-modal{
  z-index:1000;
  position:fixed;
  top:7vh;
  right:10vw;
  width:calc(80vw);
  height:80vh;
  overflow-y:auto;
  background:rgb(33,33,33);
  padding-bottom:3rem;
}
.section-modal{
  z-index:999;
  position:fixed;
  top:7vh;
  right:10vw;
  width:calc(80vw);
  height:80vh;
  overflow-y:auto;
  background:rgb(33,33,33);
  padding-bottom:3rem;
}
.section-title{
  text-transform:lowercase;
  font-size:24px;
  background:rgb(66,66,66);
  cursor: pointer;
  margin-top:0.5rem;
  margin-bottom:0.5rem;
  padding:0.3rem;
  display:block!important;
}

.btn{
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */     
  transition:background 0.2s, color 0.2s;
  cursor:pointer;
  padding:0.25rem; 
  text-align:center;
  display:inline-block;
  background:var(--bg-light);
  margin-left:0.3rem;
  margin-right:0.3rem;
}
.btn:hover{
  background:var(--high-low2);
  #color: var(--text-dark);
  font-weight:bolder;
}
.btn:active{
  background:var(--high-low);
  color: var(--text);
  font-weight:bolder;
}
.btn-sm{
  width:2rem;
  height:2rem;
  padding:0;
  font-size:2rem;
  line-height:2rem;
  vertical-align: text-bottom;
}

.btn-big{
  width:calc(100% - 2rem);
  font-size:1.5rem;
}
.btn-add{
  width:calc(100% - 2rem);
  font-size:1.2rem;
}

.btn-generate{
  font-size:2rem;
  background:var(--high-low);
  color:var(--text-dark);
  font-weight:bold;
}
.array-item{
  vertical-align: text-bottom;
  text-align:center;
  margin:0.3rem;
}
.fixed-buttons{
  position:fixed;
  #top:0.3rem;
  #left:0.3rem;
  top:0;
  left:0;
  width:100vw;
  z-index:9999;
  padding:0.3rem;
  background: var(--shade);
}

.help-text{
  border-left:2px solid white;
  padding:1rem;
}
.track-info{
  text-align:left;
  border:1px solid var(--text);
}
.track-info .form-item-title{
  text-align:left;
}
.splitter-title{
  text-transform:lowercase;
  text-align:center;
  font-size:2em;
  padding:0.5rem;
  position:relative;
}
.splitter-title::before{
  content: '/// ';
}
.splitter-title::after{
  content: ' ///';
}
.footer{
  padding-top:3rem;
  padding-bottom:3rem;
  background:var(--high-low);
  color: var(--bg);
  font-weight:bolder;
}

/*checkbox*/

/* SLIDER */

.slider {
  -webkit-appearance: none;  /* Override default CSS styles */
  appearance: none;
  width: 100%; /* Full-width */
  height: 25px; /* Specified height */
  background: #d3d3d3; /* Grey background */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
  -webkit-transition: .2s; /* 0.2 seconds transition on hover */
  transition: opacity .2s;
  vertical-align: text-bottom;
}

/* Mouse-over effects */
.slider:hover {
  opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* Override default look */
  appearance: none;
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: var(--high); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
  width: 25px; /* Set a specific slider handle width */
  height: 25px; /* Slider handle height */
  background: var(--high); /* Green background */
  cursor: pointer; /* Cursor on hover */
}

/* SCROLLBAR */

 /* width */
::-webkit-scrollbar {
  width: var(--scrollbar-width);
}

/* Track */
::-webkit-scrollbar-track {
  background: black;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(75,75,75);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(175,175,175);
} 

/* HIDE ARROWS / SPINNER */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}


</style>
